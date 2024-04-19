import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { RegisterPresaleComponent } from '../register-presale/register-presale.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParameterSelectorAsync } from '@cad-private/shared/models/Generic/parameterSelectorAsync.model';
import { BusinessActorService } from '../shared/services/business-actor.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { genericItemDTO } from '@cad-private/shared/models/Generic/genericItemDTO.model';
import { StatePresales } from '../shared/enums/statePresalesEnum';
import { ShowPresaleComponent } from '../show-presale/show-presale.component';
import { RegisterAdvancePaymentComponent } from '../register-advance-payment/register-advance-payment.component';
import { AdvancePaymentService } from '@cad-private/shared/services/advance-payment/advance-payment.service';
import { GetAdvancePaymentDTO } from '@cad-private/models/advance-payment/getAdvancePaymentDTO.model';
import { ConfirmPresaleComponent } from '../confirm-presale/confirm-presale.component';
import { PresaleService } from '@cad-private/shared/services/presale/presale.service';


@Component({
  selector: 'cad-list-presale',
  templateUrl: './list-presale.component.html',
  styleUrls: ['./list-presale.component.scss'],
  providers: [DatePipe],
})
export class ListPresaleComponent {
  columns: any[];
  actions: any[];
  listStatesFiltered: number[];
  client: genericItemDTO = new genericItemDTO();

  labelFilterClient: string = "Clientes";
  form!: FormGroup;
  parameterSelectorClients: ParameterSelectorAsync = new ParameterSelectorAsync();
  listClients: any = [];
  listStates: any[];
  data: any[] = [];
  generalDataAdvancePayment: GetAdvancePaymentDTO;

  private PAGE_SIZE_DEFAULT: number = 900;
  private PAGE_NUMBER_DEFAULT: number = 1;


  private STATE_CONFIRM: string = 'Confirmado';
  private STATE_REGISTER: string = 'Registrado';
  private STATE_FINALICE: string = 'Finalizado';
  private STATE_INVALID: string = 'Invalidado';


  constructor(public dialog: MatDialog,
    private _fb: FormBuilder,
    private _advancePaymentService: AdvancePaymentService,
    private _translate: TranslateService,
    private _bussinessActorService: BusinessActorService,
    private _presaleService: PresaleService,
    private _router: Router,
    private datePipe: DatePipe,) {
    this.reactiveForm();
    this.labelTable();
    this.getStatesPresale();

    this.initialiceData();
    // this.data = [{
    //   id: 1, registrationDate: '02/02/2024', document: 'PREV-1',
    //   anticipos: 'ANTIC-1', identityDocument: 'RUC:1070658186', legalName: 'Jorge', seller: 'jorge',
    //   totalAmount: 1000, totalAmountAnticipo: 100, outstanding: 900, stateId: 409
    // }]
    // this.setStatePresales(this.data[0]);
  }

  initialiceData() {
    this.parameterSelectorClients.minimumOfCharactersToSearchInSelectorConcept = 3;
    this.parameterSelectorClients.waitTimeInSearchLargeQuantitySelectors = 300;

  }

  ngOnInit() {
    this.setDate()
  }

  openRegister() {
    this._router.navigate(['/private/preSale/register-pre-sale']);
  }
  reactiveForm() {
    const formControls = {
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
    };
    this.form = this._fb.group(formControls);
  }

  labelTable() {
    this.columns = [
      { field: 'registrationDate', header: this.getTranslation('PRESALE.DATA.COLUMN.DATE') },
      { field: 'document', header: this.getTranslation('PRESALE.DATA.COLUMN.DOCUMENT') },
      { field: 'anticipos', header: this.getTranslation('PRESALE.DATA.COLUMN.ANTICIPOS') },
      { field: 'identityDocument', header: this.getTranslation('PRESALE.DATA.COLUMN.DOC_IDENTITY') },
      { field: 'legalName', header: this.getTranslation('PRESALE.DATA.COLUMN.BUSSINESS_NAME') },
      { field: 'seller', header: this.getTranslation('PRESALE.DATA.COLUMN.SELLER') },
      { field: 'totalAmount', header: this.getTranslation('PRESALE.DATA.COLUMN.TOTAL') },
      { field: 'totalAmountAnticipo', header: this.getTranslation('PRESALE.DATA.COLUMN.ANTICIPO') },
      { field: 'outstanding', header: this.getTranslation('PRESALE.DATA.COLUMN.OUTSTANDING_BALANCE') },
      { field: 'stateString', header: this.getTranslation('PRESALE.DATA.COLUMN.STATE') },
    ];
    this.actions = [1, 1, 0, 1];
  }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  clearEndDate() {
    if (this.form.controls.toDate.value < this.form.controls.fromDate.value) {
      this.form.controls['toDate'].setValue('');
    }
  }

  filterEndDate = (d: Date): boolean => {
    return d >= this.form.value.fromDate;

  };

  searchClients($event) {
    this._bussinessActorService.getClientsByName($event).subscribe(response => {
      this.listClients = response.data;
    });
  }

  getStatesPresale() {
    this._presaleService.getStatesPresale().subscribe(response => {
      this.listStates = response;
      this.searchPresales();
    });
  }

  searchPresales() {
    const todate = new Date(this.form.value.toDate);
    todate.setHours(23, 59, 0);

    const queryParams = {
      pageNumber: this.PAGE_NUMBER_DEFAULT,
      pageSize: this.PAGE_SIZE_DEFAULT,
      fromDate: this.datePipe.transform(this.form.value.fromDate, 'YYYY/MM/dd HH:mm:ss'),
      toDate: this.datePipe.transform(todate, 'YYYY/MM/dd HH:mm:ss'),
      clientIDs: this.client.id ? [this.client.id] : [],
      presaleStatesIDs: this.listStatesFiltered ? this.listStatesFiltered : [],
    };

    this._presaleService.getAllPresales(queryParams).subscribe(response => {
      this.data = response.items;
      this.data.map(x => {
        this.setStatePresales(x);
        x.registrationDate = this.datePipe.transform(x.registrationDate, 'dd-MM-YYYY');
      });
    });

    // this.cleanFilter();

  }

  cleanFilter() {
    this.client.id = undefined;
    this.listStatesFiltered = null;
    this.listStates = null;
    this.client.name = null;

    this.setDate();

    this.getStatesPresale();
    this.data = [];
    this.searchPresales();
  }

  setDate() {

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0); // Establecer hora a las 00:00:00 AM

    this.form.controls.fromDate.setValue(currentDate);
    this.form.controls.toDate.setValue(currentDate);
  }

  selectedStates($event) {
    this.listStatesFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  selectedClient($event) {
    this.client.id = $event.id;
    this.client.name = $event.name;

  }

  setStatePresales(presale: any) {
    if (presale.stateId == StatePresales.CONFIRM) {
      presale.stateString = this.STATE_CONFIRM;
    } else if (presale.stateId == StatePresales.REGISTERED) {
      presale.stateString = this.STATE_REGISTER;
    } else if (presale.stateId == StatePresales.INVALID) {
      presale.stateString = this.STATE_INVALID;
    } else presale.stateString = this.STATE_FINALICE;
  }

  openShow($event: number): void {
    const dialogRef = this.dialog.open(ShowPresaleComponent, {
      panelClass: 'trend-dialog',
      disableClose: true,
      height: '90%',
      data: {
        Id: $event,
      },
    });
    dialogRef.backdropClick();
    // Captura el evento emitido desde ShowPresaleComponent
    dialogRef.componentInstance.finishPresaleEventToCloseModal.subscribe(() => {
      dialogRef.close(); // Cierra el modal
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getAllVehicleInspections();
      this.searchPresales();
    });
  }

  getAdvancePaymentByPresaleID($event) {
    this._advancePaymentService.getAdvancePaymentByPresaleID($event).subscribe(response => {
      this.generalDataAdvancePayment = response.data;
      this.openAdvancePaymentModal();
    })
  }

  openAdvancePaymentModal() {
    const dialogRef = this.dialog.open(RegisterAdvancePaymentComponent, {
      disableClose: true,
      data: this.generalDataAdvancePayment,
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.cleanFilter();
    });
  }

  openEdit(Id) {
    this._router.navigate(['/private/preSale/edit-presale'], { state: { Id } });
  }



}