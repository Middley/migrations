import { Component, Input, OnInit, Inject } from '@angular/core';
import { GetAdvancePaymentDTO } from '@cad-private/models/advance-payment/getAdvancePaymentDTO.model';
import { MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';
import { PaymentTraceDTO } from '@cad-private/transactions/shared/models/payDetailDTO.model';
import { DatePipe } from '@angular/common';
import { RegsiterAdvancePaymentModel } from '@cad-private/models/advance-payment/registerAdvancePayment.model';
import { GetActorCommercialDTO } from '../shared/models/getActorCommercialDTO.model';
import { BusinessComprobantDTO } from '../shared/models/businessComprobantDTO.model';
import { AdvancePaymentService } from '@cad-private/shared/services/advance-payment/advance-payment.service';
import { MessagingService } from '@cad-core/services';
import { PresaleService } from '@cad-private/shared/services/presale/presale.service';

@Component({
  selector: 'cad-register-advance-payment',
  templateUrl: './register-advance-payment.component.html',
  styleUrls: ['./register-advance-payment.component.scss'],
  providers: [DatePipe]
})
export class RegisterAdvancePaymentComponent implements OnInit {

  // @Input() generalData: GetAdvancePaymentDTO;
  // @Input() modalRef: BsModalRef;

  parameterForPaymentMode: any;
  paymentMethods: any;
  parameterPaymentMethods: any;
  bankAccounts: any;
  financialEntities: any;
  cards: any;
  // applyIGVAnticipo: Boolean = false;
  advancePayment: RegsiterAdvancePaymentModel = new RegsiterAdvancePaymentModel();
  aciveButtonSave: Boolean = false;
  disableClient: boolean = false;

  // closeModal() {
  //   this.modalRef.hide();
  // }

  constructor(
    private _preSaleService: PresaleService,
    private datePipe: DatePipe,
    private _advancePaymentService: AdvancePaymentService,
    private _msgService: MessagingService,
    @Inject(MAT_DIALOG_DATA) public generalData: GetAdvancePaymentDTO,
    private _registerAdvancePaymentModal: MatDialogRef<RegisterAdvancePaymentComponent>,) {
    this.setInitData();
  }

  ngOnInit() {
    this.GetDataForMultipay();
  }

  setInitData() {
    this.advancePayment.orderPresaleID = this.generalData.id;
    this.advancePayment.applyIGVAnticipo = false
    if (this.generalData.clientAdvancePayment != null) {
      this.advancePayment.client = this.generalData.clientAdvancePayment;
      this.disableClient = true;
    }

  }

  GetDataForMultipay() {
    this._preSaleService.getParameterForPaymentMode().subscribe(response => {
      this.parameterForPaymentMode = response.data;
    })

    this._preSaleService.getPaymentMethod().subscribe(response => {
      this.paymentMethods = response;
    })

    this._preSaleService.getParameterForPaymentMethod().subscribe(response => {
      this.parameterPaymentMethods = response.data;
    })
    this._preSaleService.GetBankAccountsWithFinancialEntityWithCurrency().subscribe(response => {
      this.bankAccounts = response;
    })

    this._preSaleService.getFinancialEntities().subscribe(response => {
      this.financialEntities = response;
      this.financialEntities.splice(0, 1);
    })

    this._preSaleService.getOperatorsCard().subscribe(response => {
      this.cards = response;
    })
  }

  setPayData(event: any) {
    var trace: PaymentTraceDTO[] = [];
    for (var i = 0; i < event.traza.length; i++) {
      var traceDetail = new PaymentTraceDTO();
      traceDetail.payInformation.importToPay = event.traza[i].info.importAPay;
      traceDetail.payInformation.importDelivered = event.traza[i].info.amountDelivered;
      traceDetail.payInformation.bankAccount.id = (event.traza[i].info.bankAccountId == '' || event.traza[i].info.bankAccountId == null) ? 0 : event.traza[i].info.bankAccountId;
      traceDetail.payInformation.bankAccount.value = (event.traza[i].info.bankAccountValue == '' || event.traza[i].info.bankAccountValue == null) ? 0 : event.traza[i].info.bankAccountValue;
      traceDetail.payInformation.financialEntity.id = (event.traza[i].info.financialEntityId == '' || event.traza[i].info.financialEntityId == null) ? 0 : event.traza[i].info.financialEntityId;
      traceDetail.payInformation.operatorCard.id = (event.traza[i].info.carOperatorId == '' || event.traza[i].info.carOperatorId == null) ? 0 : event.traza[i].info.carOperatorId;
      traceDetail.paymentMethod.id = event.traza[i].paymentMethodId;
      traceDetail.paymentMethod.name = event.traza[i].paymentMethodName;

      trace.push(traceDetail);
    };
    this.advancePayment.pay.payMode = event.paymentMode;
    this.advancePayment.pay.total = event.total;
    this.advancePayment.pay.trace = trace;
    this.validateSave();
  }

  save() {

    this.advancePayment.registrationDate = this.datePipe.transform(new Date(), 'YYYY/MM/dd HH:mm:ss');

    this.advancePayment.total = this.advancePayment.pay.trace.reduce((total, item) => total + item.payInformation.importDelivered, 0);
    if (!this.generalData.applyAmazonLaw) this.advancePayment.applyIGVAnticipo = true;

    this._advancePaymentService.CreateAdvancePayment(this.advancePayment).subscribe(response => {
      this._msgService.success('VEHICLE_INSPECTIONS.MESSAGES.ADD.SUCCESS', 'VEHICLE_INSPECTIONS.MESSAGES.ADD.SUCCESS_TITLE');
      this._registerAdvancePaymentModal.close();
    })
  }

  setComrpobant($event: BusinessComprobantDTO) {
    this.advancePayment.comprobant = $event;
    this.validateSave();
  }

  setActorComercial($event: GetActorCommercialDTO) {
    this.advancePayment.client = $event;
    this.validateSave();
  }

  validateSave() {
    if (this.advancePayment.orderPresaleID && this.advancePayment.pay.trace && this.advancePayment.comprobant && this.advancePayment.client.id) {
      if (this.advancePayment.pay.trace.length > 0) {
        this.aciveButtonSave = true;
      } else {
        this.aciveButtonSave = false;
      }
    } else {
      this.aciveButtonSave = false;
    }
  }

}
