import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ShowInventoryAdjustmentComponent } from '../show-inventory-adjustment/show-inventory-adjustment.component';
import { TranslateService } from '@ngx-translate/core';
import { RegisterInventoryAdjustmentComponent } from '../register-inventory-adjustment/register-inventory-adjustment.component';
import { StockAdjustmentService } from '../shared/services/stock-adjustment.service';
import { WareHouseService } from '@cad-private/warehouse/shared/services/warehouse.service';

@Component({
  selector: 'cad-list-inventory-adjustment',
  templateUrl: './list-inventory-adjustment.component.html',
  styleUrls: ['./list-inventory-adjustment.component.scss'],
  providers: [DatePipe],
})
export class ListInventoryAdjustmentComponent implements OnInit {
  columns: any[];
  actions: any[];
  data: any[] = [];
  form: FormGroup;
  listWarehouse: any[];
  listWarehouseFiltered: any[];
  listEstablishmentFiltered: any[];
  private PAGE_SIZE_DEFAULT: string = '900';
  private PAGE_NUMBER_DEFAULT: string = '1';
  listEstablishment: any;
  typeWareHouses: any = [];

  constructor(
    public dialog: MatDialog,
    private _fb: FormBuilder,
    private datePipe: DatePipe,
    private _translate: TranslateService,
    private _stockAdjustmentService: StockAdjustmentService,
    private _warehouseService: WareHouseService
  ) {
    this.labelTable();
    this.GetAllEstablishmentsAndTypeWarehouses();
  }

  ngOnInit(): void {
    this.getStockAdjustments();
  }

  getStockAdjustments() {

    const queryParams = { pageSize: this.PAGE_SIZE_DEFAULT, pageNumber: this.PAGE_NUMBER_DEFAULT };
    this._stockAdjustmentService.getAll(queryParams).subscribe(res => {
      this.data = res;
      this.data.map(x => {
        x.registrationDate = this.datePipe.transform(x.registrationDate, 'dd-MM-YYYY');
        // x.employee = x.employee.replace(/\|/g, ' ');
      });
    });
  }

  labelTable() {
    this.columns = [
      { field: 'registrationDate', header: this.getTranslation('WAREHOUSE.INVENTORY_ADJUSTMENT.DATA.DATE_REGISTER') },
      { field: 'warehouse', header: this.getTranslation('WAREHOUSE.INVENTORY_ADJUSTMENT.DATA.WAREHOUSE') },
      { field: 'employee', header: this.getTranslation('WAREHOUSE.INVENTORY_ADJUSTMENT.DATA.EMPLOYEE') },
      { field: 'totalAdjustment', header: this.getTranslation('WAREHOUSE.INVENTORY_ADJUSTMENT.DATA.IMPORT_ADJUSTMENT') },
    ];
    this.actions = [1, 0, 0];
  }

  openShow($event: number): void {
    const dialogRef = this.dialog.open(ShowInventoryAdjustmentComponent, {
      disableClose: true,
      data: {
        Id: $event,
      },
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.getStockAdjustments();
    });
  }

  inputDate() {
    const formControls = {
      IssueDate: new FormControl('', []),
      ToDate: new FormControl('', []),
      WarehouseTypeId: new FormControl(this.typeWareHouses[0].id, [])
    };
    this.form = this._fb.group(formControls);
  }

  clearEndDate() {
    this.form.controls['EndDate'].setValue('');
  }

  filterEndDate = (d: Date): boolean => {
    return this.form.value.IssueDate < d;
  };

  clearFilters() {
    this.listEstablishment = null;
    this.listWarehouse = null;
    this.GetAllEstablishmentsAndTypeWarehouses();
  }

  openRegister() {
    const dialogRef = this.dialog.open(RegisterInventoryAdjustmentComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.getStockAdjustments();
    });
  }

  selectedEstablisment($event) {
    this.listEstablishmentFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  selectedWarehouse($event) {
    this.listWarehouseFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  GetAllEstablishmentsAndTypeWarehouses() {
    this._stockAdjustmentService.GetAllEstablishmentsAndTypeWarehouses().subscribe(response => {
      this.listEstablishment = response.data.listEstablishments;
      this.typeWareHouses = response.data.listTypeWarehouses;
      this.inputDate();
      this.getAllWarehouseByEstablismentId();
    });
  }

  changeTypeWarehouse() {
    this._stockAdjustmentService.GetAllEstablishmentsAndTypeWarehouses().subscribe(response => {
      this.listEstablishment = response.data.listEstablishments;
      this.listWarehouse = [];
      this.listWarehouseFiltered = [];
      this.getAllWarehouseByEstablismentId();
    });
  }

  getAllWarehouseByEstablismentId() {
    var establishment = [];
    this.listEstablishment.forEach(item => {
      establishment.push(item.id);
    })

    this._warehouseService.getWarehouseByEstablismentId(establishment, this.form.controls.WarehouseTypeId.value).subscribe(response => {
      this.listWarehouse = response;
    });
  }

  SearchByFilter() {
    const todate = new Date(this.form.value.ToDate);
    todate.setHours(23, 59, 0);

    let Filter = {
      establishmentIds: this.listEstablishmentFiltered,
      warehouseIds: this.listWarehouseFiltered,
      warehouseTypeId: this.form.value.WarehouseTypeId,
      issueDate: this.datePipe.transform(this.form.value.IssueDate, 'YYYY/MM/dd'),
      toDate: this.datePipe.transform(todate, 'YYYY/MM/dd HH:mm:ss'),
      pageNumber: '1',
      pageSize: '30',
    };

    this._stockAdjustmentService.getAllStockAdjustmentBySearch(Filter).subscribe(response => {
      this.data = response.items;
      this.data.map(x => {
        x.registrationDate = this.datePipe.transform(x.registrationDate, 'dd-MM-YYYY');
        // x.employee = x.employee.replace(/\|/g, ' ');
      });

    });

  }

}
