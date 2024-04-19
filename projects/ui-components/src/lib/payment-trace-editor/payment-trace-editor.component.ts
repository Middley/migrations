import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParameterPaymentMethod } from '../model/multipay-register.model';
import { GenericItem } from '../model/generic-item.model';
import { Pay, PayDetail, PaymentMethod } from '../model/pay.model';

@Component({
  selector: 'cad-payment-trace-editor',
  templateUrl: './payment-trace-editor.component.html',
  styleUrls: ['./payment-trace-editor.component.scss']
})
export class PaymentTraceEditorComponent {

  @Input() parameterPaymentMethod: ParameterPaymentMethod;
  @Input() financialEntities: GenericItem[];
  @Input() paymentMethod: PaymentMethod;
  @Input() ammountTotal: number;
  @Input() bankAccounts: GenericItem[];
  @Input() cards: GenericItem[];
  @Input() importAPay: number;
  @Input() traza: PayDetail;
  @Input() activeError: Boolean;
  @Input() messageError: string;


  form: FormGroup;

  @Output() paymentTraceEditor = new EventEmitter<any>();


  constructor(private _fb: FormBuilder) {

    const formControls = {
      bankAccountId: new FormControl('', []),
      bankAccountValue: new FormControl('', []),
      financialEntityId: new FormControl('', []),
      amountDelivered: new FormControl(0, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
      received: new FormControl(0, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
      carOperatorId: new FormControl('', []),
      observation: new FormControl('', []),
    };

    this.form = this._fb.group(formControls);
  }

  ngOnInit() {
    if (this.form) {
      this.form.controls.amountDelivered.setValue(this.importAPay);
      this.form.controls.received.setValue(this.importAPay);
    }
  }

  changeValueAmountDelivered($event) {
    this.form.controls.received.setValue(this.form.controls.amountDelivered.value);
  }


  InitialiceDataTraza() {
    this.form.controls.amountDelivered.setValue(this.traza.info.amountDelivered);

    if (this.parameterPaymentMethod.depositInAccount == this.paymentMethod.id || this.parameterPaymentMethod.transferOfFunds == this.paymentMethod.id) {
      this.form.controls.bankAccountId.setValue(this.traza.info.bankAccountId);
      this.form.controls.observation.setValue(this.traza.info.observation);
    }
    if (this.parameterPaymentMethod.debitCard == this.paymentMethod.id || this.parameterPaymentMethod.creditCard == this.paymentMethod.id) {
      this.form.controls.financialEntityId.setValue(this.traza.info.financialEntityId);
      this.form.controls.carOperatorId.setValue(this.traza.info.carOperatorId);
      this.form.controls.observation.setValue(this.traza.info.observation);
    }
  }


  addTraza() {

    if (
      (((this.paymentMethod.id == this.parameterPaymentMethod.depositInAccount || this.paymentMethod.id == this.parameterPaymentMethod.transferOfFunds) && this.form.controls.bankAccountId.value != null) ||
        ((this.paymentMethod.id == this.parameterPaymentMethod.debitCard || this.paymentMethod.id == this.parameterPaymentMethod.creditCard) && this.form.controls.financialEntityId.value != null && this.form.controls.carOperatorId.value != null) ||
        (this.paymentMethod.id == this.parameterPaymentMethod.cashPaymentMethod))
      &&
      this.form.controls.amountDelivered.value != null
    ) {

      var bankAccount = this.bankAccounts.find(ba => ba.id == this.form.value.bankAccountId);
      var traza = {
        info: {
          bankAccountId: this.form.value.bankAccountId,
          bankAccountValue: bankAccount != undefined ? bankAccount.value : "",
          financialEntityId: this.form.value.financialEntityId,
          importAPay: this.importAPay,
          amountDelivered: this.form.value.amountDelivered,
          observation: this.form.value.observation,
          carOperatorId: this.form.value.carOperatorId
        },
        paymentMethodId: this.paymentMethod.id,
        paymentMethodName: this.paymentMethod.name
      }
      var value = this.importAPay - this.form.controls.amountDelivered.value;

      this.paymentTraceEditor.emit(traza);
      this.form.controls.amountDelivered.setValue(value);

    }
    this.clearForm();
  }

  clearForm() {
    this.form.reset();
  }

  showMessageError() {
    this.activeError = true;
    // Ocultar el mensaje de error después de 5 segundos (5000 milisegundos)
    setTimeout(() => {
      this.activeError = false;
    }, 5000);
  }



}
