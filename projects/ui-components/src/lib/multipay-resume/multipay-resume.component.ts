import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GenericItem } from '../model/generic-item.model';

@Component({
  selector: 'cad-multipay-resume',
  templateUrl: './multipay-resume.component.html',
  styleUrls: ['./multipay-resume.component.scss']
})
export class MultipayResumeComponent {

  @Input() multipayResumenArray: GenericItem[];
  @Input() ammountTotal: number;
  @Input() ammountPay: number;
  @Output() removePaymentMethod = new EventEmitter<any>();
  @Output() editMultipayResumen = new EventEmitter<any>();


  deleteMethodPayment(id: number) {
    var index = this.multipayResumenArray.findIndex(item => item.id == id);
    this.multipayResumenArray.splice(index, 1);
    this.removePaymentMethod.emit(id);
  }

  editMultipayment(id) {
    this.editMultipayResumen.emit(id);
  }


}
