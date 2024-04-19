import { Component, Input } from '@angular/core';

@Component({
  selector: 'cad-operation-viwer',
  templateUrl: './operation-viwer.component.html',
  styleUrls: ['./operation-viwer.component.scss']
})
export class OperationViwerComponent {

  @Input() operation: any;
  @Input() decimalInAmountParameter: any;
  @Input() operationToCalculate: any;
}
