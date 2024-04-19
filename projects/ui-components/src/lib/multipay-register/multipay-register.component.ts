import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ParameterForPaymentMode, ParameterPaymentMethod } from '../model/multipay-register.model';
import { GenericItem } from '../model/generic-item.model';
import { Pay, PayDetail, PayDetailDetail, PaymentMethod } from '../model/pay.model';
import { FormBuilder } from '@angular/forms';
import { PaymentTraceEditorComponent } from '../payment-trace-editor/payment-trace-editor.component';
import { PaymentMethodSelectorComponent } from '../payment-method-selector/payment-method-selector.component';

@Component({
  selector: 'cad-multipay-register',
  templateUrl: './multipay-register.component.html',
  styleUrls: ['./multipay-register.component.scss']
})
export class MultipayRegisterComponent {

  @Input() parameterPaymentMode: ParameterForPaymentMode;
  @Input() parameterPaymentMethod: ParameterPaymentMethod;
  @Input() AllowPaymentToCredit: Boolean;
  @Input() AllowPaymentToCreditConfigured: Boolean;
  @Input() paymentMethods: GenericItem[];
  @Input() bankAccounts: GenericItem[];
  @Input() financialEntities: GenericItem[];
  @Input() multipayResumenArray: GenericItem[];
  @Input() cards: GenericItem[];
  @Input() idPaymentMethod: number;
  @Input() ammountTotal: number;
  ammountPay: number;
  importAPay: number;
  isEdit: Boolean;
  trazaTemporal: PayDetail;
  activeErrorTraza: Boolean = false;
  messageError: string;
  messageErrorDuplicate: string = 'Ya existe un metodo de pago registrado de este tipo';
  messageErrorOverFlow: string = 'La cantidad ingresada supera el monto total';


  paymentMethod: PaymentMethod;
  @ViewChild(PaymentTraceEditorComponent, { static: false }) paymentTraceComponent: PaymentTraceEditorComponent;
  @ViewChild(PaymentMethodSelectorComponent, { static: false }) paymentMethodSelectorComponent: PaymentMethodSelectorComponent;



  pay: Pay;

  @Output() multipay = new EventEmitter<any>();



  constructor(private _fb: FormBuilder) {

    this.pay = new Pay();
    this.pay.traza = [];
    this.multipayResumenArray = [];
    this.paymentMethod = new PaymentMethod();
    this.isEdit = false;
  }

  selectedpaymentMode(selectedPaymentMode: number) {
    this.pay.paymentMode = selectedPaymentMode;
    this.multipay.emit(this.pay);
  }

  ngOnInit() {
    if (this.parameterPaymentMode) this.pay.paymentMode = this.parameterPaymentMode.cashPaymentMode;
    // this.paymentMethodSelector(this.paymentMethods[this.paymentMethods.length - 1].id);
    this.importAPay = this.ammountTotal;
    this.pay.total = this.ammountTotal;
    this.trazaTemporal = new PayDetail();
    this.trazaTemporal.info = new PayDetailDetail();


  }

  paymentMethodSelector(id: number) {
    var paymentMethod = this.paymentMethods.find(element => element.id == id);
    this.paymentMethod.id = paymentMethod.id;
    this.paymentMethod.name = paymentMethod.name;
    if (this.paymentTraceComponent) {
      this.paymentTraceComponent.clearForm();
    }
  }

  addTrace(data: PayDetail) {
    this.importAPay = this.ammountTotal - this.pay.traza.reduce((acumulador, item) => acumulador + item.info.amountDelivered, 0);
    if (data.info.amountDelivered) {
      if (data.info.amountDelivered <= this.importAPay) {
        var isThereTraza = !!this.pay.traza.find(item => item.paymentMethodId == data.paymentMethodId);
        if (isThereTraza) {
          if (this.isEdit) {
            var indexTraza = this.pay.traza.findIndex(item => item.paymentMethodId == data.paymentMethodId);
            var indexMultipayResumen = this.multipayResumenArray.findIndex(item => item.id == data.paymentMethodId);

            this.pay.traza[indexTraza] = data;
            this.multipayResumenArray[indexMultipayResumen].value = data.info.amountDelivered;
          } else {
            this.messageError = this.messageErrorDuplicate;
            this.paymentTraceComponent.showMessageError();
          }

        } else if (!isThereTraza) {
          this.pay.traza.push(data);
          var methodPayment = this.paymentMethods.find(element => element.id == data.paymentMethodId);
          this.multipayResumenArray.push({ id: data.paymentMethodId, name: methodPayment.value, value: data.info.amountDelivered });

        }
        this.ammountPay = this.multipayResumenArray.reduce((acumulador, item) => acumulador + item.value, 0)
        this.importAPay = this.ammountTotal - this.ammountPay;


        this.multipay.emit(this.pay);
      }
      else {
        this.messageError = this.messageErrorOverFlow;
        this.paymentTraceComponent.showMessageError();
      }

      this.isEdit = false;

    }
  }


  removeMultipaytMethod(id) {
    var index = this.pay.traza.findIndex(item => item.paymentMethodId == id);
    this.pay.traza.splice(index, 1);
    this.calcAmmounTotal();
    this.multipay.emit(this.pay);
  }

  editMultipayResumen(id) {
    this.isEdit = true;
    var searchPaymentMethod = this.paymentMethods.find(item => item.id == id);
    this.paymentMethodSelectorComponent.selectPaymentMethod(searchPaymentMethod.id);
    // this.idPaymentMethod = this.paymentMethod.id;

    var traza = this.pay.traza.find(item => item.paymentMethodId == id);
    this.trazaTemporal.info = traza.info;
    this.trazaTemporal.paymentMethodId = traza.paymentMethodId;


    this.importAPay = this.multipayResumenArray.reduce((acumulador, item) => acumulador + item.value, 0);
    this.importAPay = this.importAPay - this.trazaTemporal.info.amountDelivered;
    this.importAPay = this.ammountTotal - this.importAPay;


    this.paymentTraceComponent.InitialiceDataTraza();

    // this.calcAmmounTotal();
  }

  calcAmmounTotal() {
    this.ammountPay = this.multipayResumenArray.reduce((acumulador, item) => acumulador + item.value, 0)
    this.importAPay = this.ammountTotal - this.ammountPay;
  }

  refreshMultipay() {
    this.multipayResumenArray = [];
  }
}
