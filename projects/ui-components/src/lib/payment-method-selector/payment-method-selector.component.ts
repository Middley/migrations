import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GenericItem } from '../model/generic-item.model';

@Component({
  selector: 'cad-payment-method-selector',
  templateUrl: './payment-method-selector.component.html',
  styleUrls: ['./payment-method-selector.component.scss']
})
export class PaymentMethodSelectorComponent {


  @Input() paymentMethods: GenericItem[];
  @Input() idPaymentMethod: number;

  @Output() paymentMethodSelector = new EventEmitter<any>();

  ngOnInit() {
    this.paymentMethodSelector.emit(this.idPaymentMethod);
  }

  selectPaymentMethod(paymentMethodId: number) {
    this.idPaymentMethod = paymentMethodId;
    this.paymentMethodSelector.emit(this.idPaymentMethod);

  }

}
