import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ComplementRegisterInventoryAdjustmentComponent } from '../complement-register-inventory-adjustment/complement-register-inventory-adjustment.component';
import { WareHouseService } from '@cad-private/warehouse/shared/services/warehouse.service';
import { StockAdjustmentService } from '../shared/services/stock-adjustment.service';
import { ModalService } from '../shared/services/modal.service';
import { AdjustmentDetails, RegisterStockAdjustment } from '../shared/interfaces/register-stock-adjustment.interface';
import { MessagingService } from '@cad-core/services';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationDialogComponent, DialogModel } from '@sw-ui-components';
import { ParameterSelectorConcept } from '@cad-private/concept/shared/models/parameter.model';
import { BusinessConceptSelectionMode } from 'projects/backoffice/src/assets/enums/SearchByCriterionEnum';
import { ConceptService } from '@cad-private/concept/shared/services/concept.service';


@Component({
  selector: 'app-register-inventory-adjustment',
  templateUrl: './register-inventory-adjustment.component.html',
  styleUrls: ['./register-inventory-adjustment.component.scss'],
  providers: [DatePipe],
})
export class RegisterInventoryAdjustmentComponent implements OnInit {
  form!: FormGroup;
  listEstablishment: any = [];
  listWareHouse: any = [];
  typeWareHouses: any = [];
  businessConceptSelectionMode: number;
  minimumOfCharactersToSearchInSelectorConcept: number;
  waitTimeInSearchLargeQuantitySelectors: number;
  parametersConcept: ParameterSelectorConcept = new ParameterSelectorConcept();
  warehouseId: number = 0;
  deleteIcon = 'mdi-trash-can';
  // disableSelector: boolean = true;
  colorConfirmButton = 'btn_confirm_success';
  colorCancelButton = 'btn_cancel';
  modalData: any;
  isDuplicate: boolean = false;
  loading: boolean = true;
  verifyAdjustmentDetail: boolean = true;


  //selector de conceptos

  listConcept: any[];


  constructor(
    private _fb: FormBuilder,
    private _conceptService: ConceptService,
    public dialog: MatDialog,
    private _msgService: MessagingService,
    private registerInventoryAdjustmentModal: MatDialogRef<RegisterInventoryAdjustmentComponent>,
    private _stockAdjustmentService: StockAdjustmentService,
    private _warehouseService: WareHouseService,
    private modalService: ModalService,
    private _dialogService: DialogService
  ) {
    this.GetAllEstablishmentsAndTypeWarehouses();
  }

  ngOnInit(): void {
  }


  reactiveForm() {
    const formControls = {
      confirmedAdjustment: new FormControl(false, [Validators.required]),
      disabledSelector: new FormControl(true, [Validators.required]),
      typeWarehouseId: new FormControl(this.typeWareHouses[0].id, [Validators.required]),
      establishmentId: new FormControl('', [Validators.required]),
      warehouseId: new FormControl({ value: '', disabled: true }, [Validators.required]),
      observation: new FormControl('', []),
      inventoryAdjustmentDetail: this._fb.array([]),
    };

    this.form = this._fb.group(formControls);
  }

  get inventoryAdjustmentDetail() {
    return this.form.get('inventoryAdjustmentDetail') as FormArray;
  }

  inventoryAdjustmentDetailTemporal(index) {
    return this.inventoryAdjustmentDetail.controls[index].get('inventoryAdjustmentDetailTemporal') as FormArray;
  }

  addConceptTable($event) {

    if (this.inventoryAdjustmentDetail.controls.length > 0) {
      this.isDuplicate = this.inventoryAdjustmentDetail.controls.some(iad => iad.value.conceptId == $event.id && iad.value.conceptName == $event.name);
    }
    if (this.isDuplicate == false) {
      this.inventoryAdjustmentDetail.push(
        this._fb.group({
          conceptId: new FormControl($event.id, [Validators.required]),
          conceptName: new FormControl($event.name, [Validators.required]),
          stockSystem: new FormControl($event.stock, [Validators.required]),
          stockCurrent: new FormControl('', [Validators.required]),
          unitCost: new FormControl({ value: $event.unitCost, disabled: true }, [Validators.required, Validators.pattern(/^(?:0(?:\.\d+)?|[1-9]\d*(?:\.\d+)?)(?:[eE][+-]?\d+)?$/)]),
          adjustment: new FormControl(0, []),
          observation: new FormControl('', []),
          inventoryAdjustmentDetailTemporal: this._fb.array([]),
        })
      );
    }
    if (this.inventoryAdjustmentDetail.length == 1) {
      this.verifyAdjustmentDetail = false;
    }
  }


  removeDataConcept(i) {
    this.inventoryAdjustmentDetail.removeAt(i);

    if (this.inventoryAdjustmentDetail.length == 0) {
      this.verifyAdjustmentDetail = true;
    }
  }

  addCurrentStock(i) {
    this.inventoryAdjustmentDetail.controls[i].enable();
    const dialogRef = this.dialog.open(ComplementRegisterInventoryAdjustmentComponent, {
      disableClose: true,
      data: {
        index: i,
        concept: this.inventoryAdjustmentDetail.controls[i].value
      },
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.modalData = this.modalService.getModalData();

      if (this.modalData != undefined) {

        this.setValuesToInventoryAdjustmentDetailTemporal(this.modalData);
        this.modalService.setModalData(undefined);
      }
      if (this.inventoryAdjustmentDetail.controls[i].get('inventoryAdjustmentDetailTemporal').value.length > 1) {
        this.inventoryAdjustmentDetail.controls[i].get('stockCurrent').disable();
        this.inventoryAdjustmentDetail.controls[i].get('observation').disable();
      }
      this.validateAdjustment(i);

    });
    this.validateAdjustment(i);
  }

  validateAdjustment(index) {
    if (this.inventoryAdjustmentDetail.controls[index].get('adjustment').value < 0) {
      this.inventoryAdjustmentDetail.controls[index].get('unitCost').disable();
    }
  }

  changeWarehouse() {
    if (this.inventoryAdjustmentDetail) {
      this.inventoryAdjustmentDetail.clear();
    }

    this.form.controls.disabledSelector.setValue(false);
    if (this.inventoryAdjustmentDetail.length == 0) {
      this.verifyAdjustmentDetail = true;
    }
  }

  setValuesToInventoryAdjustmentDetailTemporal(dataInventoryAdjustmentDetailTemporal) {

    var conceptDetail = dataInventoryAdjustmentDetailTemporal.value;
    var detail = '';
    dataInventoryAdjustmentDetailTemporal.value.inventoryAdjustmentDetail.forEach(item => {
      detail = detail + item.observation + ' | ';
    })

    this.inventoryAdjustmentDetail.controls[conceptDetail.indexFormArray].patchValue({
      stockCurrent: conceptDetail.stockCurrent,
      stockSystem: conceptDetail.stockSystem,
      observation: detail,
      adjustment: conceptDetail.adjustment
    });

    const control = this.inventoryAdjustmentDetail.at(conceptDetail.indexFormArray);
    control.get('stockCurrent').disable();
    control.get('observation').disable();
    if (control.value.adjustment < 0) {
      control.get('unitCost').disable();
    }

    this.addDetailConcept(conceptDetail.inventoryAdjustmentDetail, conceptDetail.indexFormArray);

  }

  addDetailConcept(ConceptDetail, index) {
    this.inventoryAdjustmentDetailTemporal(index).clear();
    ConceptDetail.forEach(cd => {
      this.inventoryAdjustmentDetailTemporal(index).push(
        this._fb.group({
          stockCurrent: new FormControl(cd.stockCurrent, [Validators.required]),
          observation: new FormControl(cd.observation, []),
          checked: new FormControl(cd.checked, [])
        })
      );
    })

  }

  //Peticiones a la BD
  GetAllEstablishmentsAndTypeWarehouses() {
    this._stockAdjustmentService.GetAllEstablishmentsAndTypeWarehouses().subscribe(response => {
      this.listEstablishment = response.data.listEstablishments;
      this.typeWareHouses = response.data.listTypeWarehouses;
      this.parametersConcept.businessConceptSelectionMode = BusinessConceptSelectionMode.businessConceptSelectionModeAsync;
      this.parametersConcept.minimumOfCharactersToSearchInSelectorConcept = response.data.minimumOfCharactersToSearchInSelectorConcept;
      this.parametersConcept.waitTimeInSearchLargeQuantitySelectors = response.data.waitTimeInSearchLargeQuantitySelectors;
      this.reactiveForm();
    });
  }

  getAllWarehouseByEstablismentId() {
    this.form.controls.warehouseId.enable();
    var establishment = [this.form.controls.establishmentId.value];
    this._warehouseService.getWarehouseByEstablismentId(establishment, this.form.controls.typeWarehouseId.value).subscribe(response => {
      this.listWareHouse = response;

    });
    if (this.inventoryAdjustmentDetail) {
      this.inventoryAdjustmentDetail.clear();
    }
  }

  calcAdjustment(i) {
    const controlStockAdjustmentDetail = this.inventoryAdjustmentDetail.at(i);

    controlStockAdjustmentDetail.get('unitCost').enable();
    controlStockAdjustmentDetail.patchValue({ adjustment: controlStockAdjustmentDetail.value.stockCurrent - controlStockAdjustmentDetail.value.stockSystem });
    // if (controlStockAdjustmentDetail.value.adjustment < 0 && controlStockAdjustmentDetail.value.unitCost != 0) {
    //   controlStockAdjustmentDetail.get('unitCost').disable();
    // }
    if (controlStockAdjustmentDetail.value.adjustment < 0) {
      controlStockAdjustmentDetail.get('unitCost').disable();
    }
  }

  changeTypeWareHouse() {
    this.form.controls.establishmentId.setValue('');
    this.form.controls.warehouseId.setValue('');
    this.form.controls.warehouseId.disable();
    this.form.controls.disabledSelector.setValue(true);
    this.inventoryAdjustmentDetail.clear();

  }

  save() {
    this.loading = false;

    if (this.form.valid && this.inventoryAdjustmentDetail.valid) {
      var adjustmentDetail: AdjustmentDetails[] = [];
      this.inventoryAdjustmentDetail.enable();
      this.inventoryAdjustmentDetail.controls.forEach((itemDetail, index) => {
        var detalle = this.inventoryAdjustmentDetailTemporal(index).value;
        if (detalle.length == 0) {
          detalle.push({ stockCurrent: itemDetail.value.stockCurrent, observation: itemDetail.value.observation, checked: true });
        }

        adjustmentDetail.push({ conceptId: itemDetail.value.conceptId, stock: itemDetail.value.stockSystem, adjustment: itemDetail.value.adjustment, unitCost: itemDetail.value.unitCost, note: detalle })
      })

      this.form.controls.warehouseId.enable();

      const DATA_STOCK_ADJUSTMENT: RegisterStockAdjustment = new RegisterStockAdjustment(
        this.form.value.confirmedAdjustment,
        this.form.value.warehouseId,
        this.form.value.typeWarehouseId,
        this.form.value.observation,
        adjustmentDetail,
      );

      this._stockAdjustmentService.add(DATA_STOCK_ADJUSTMENT).subscribe(response => {
        this.loading = true;
        this._msgService.success('VEHICLE_INSPECTIONS.MESSAGES.ADD.SUCCESS', 'VEHICLE_INSPECTIONS.MESSAGES.ADD.SUCCESS_TITLE');

        this.registerInventoryAdjustmentModal.close();
      })
    }
  }

  confirmedAdjustment() {

    const ref = this._dialogService.open(ConfirmationDialogComponent, {
      header: this._msgService.getTranslation('WAREHOUSE.INVENTORY_ADJUSTMENT.DATA.CONFIRM_ADJUSTMENT'),
      data: new DialogModel(
        this._msgService.getTranslation('GENERAL.BUTTONS.CANCEL'),
        this._msgService.getTranslation('GENERAL.BUTTONS.CONFIRM'),
        this._msgService.getTranslation('WAREHOUSE.INVENTORY_ADJUSTMENT.MESSAGE.CONFIRM_ADJUSTMENT'),
        this.deleteIcon,
        '',
        '',
        '',
        this.colorConfirmButton,
        this.colorCancelButton
      ),
    });
    ref.onClose.subscribe((confirm: boolean) => {
      if (confirm) {
        this.form.controls.confirmedAdjustment.setValue(true);
        this.save()
      }
    });
  }

  GetConceptsByName($event) {
    this._conceptService.GetAllConceptByName(this.form.controls.typeWarehouseId.value, this.form.controls.warehouseId.value, $event).subscribe(response => {
      this.listConcept = response;

    });
  }

  searchConceptByCode($event) {
    this._conceptService.GetConcepIdByBarcode($event).subscribe(response => {
      this.getConceptByConceptIdAndWarehouse(response.data);
    });
  }

  getConceptByConceptIdAndWarehouse(conceptId: number) {
    this._conceptService.GetConceptByConceptIdAndWarehouse(this.form.controls.typeWarehouseId.value, this.form.controls.warehouseId.value, conceptId).subscribe(response => {
      if (response.data) {
        this.addConceptTable(response.data);
      }
    });
  }

}
