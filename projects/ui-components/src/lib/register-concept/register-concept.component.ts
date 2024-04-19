import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ParameterSelectorConcept } from '@cad-private/concept/shared/models/parameter.model';
import { OperationDetail } from '@cad-private/presale/shared/models/operationDetail.model';

@Component({
  selector: 'cad-register-concept',
  templateUrl: './register-concept.component.html',
  styleUrls: ['./register-concept.component.scss'],

})
export class RegisterConceptComponent {
  @Input() selectorConceptData: any;
  @Input() conceptDetailData: any;
  @Input() conceptDetails: OperationDetail[];
  @Input() listConcept: any[];
  @Input() parametersSelectorConcept: ParameterSelectorConcept;



  //parameter
  @Input() parametersConceptDetail: any;
  @Output() searchConceptInSelectorEvent = new EventEmitter<any>();
  @Output() searchConceptByCode = new EventEmitter<any>();
  @Output() refreshSelector = new EventEmitter<any>();


  @Output() changeAmountConceptDetailEvent = new EventEmitter<any>();
  @Output() changeUnitPriceConceptDetailEvent = new EventEmitter<any>();
  @Output() changeImportConceptDetailEvent = new EventEmitter<any>();
  @Output() changeTariffConceptDetailEvent = new EventEmitter<any>();
  @Output() deleteConceptDetailEvent = new EventEmitter<any>();

  selectConceptSelector(event) {
    this.searchConceptInSelectorEvent.emit(event);
  }

  searchConceptByCod(event) {
    this.searchConceptByCode.emit(event);
  }

  changeAmountConceptDetail($event) {
    this.changeAmountConceptDetailEvent.emit($event);
  }
  changeUnitPriceConceptDetail($event) {
    this.changeUnitPriceConceptDetailEvent.emit($event);
  }
  changeImportConceptDetail($event) {
    this.changeImportConceptDetailEvent.emit($event);
  }
  changeTariffConceptDetail($event) {
    this.changeTariffConceptDetailEvent.emit($event);
  }
  deleteConceptDetail($event) {
    this.deleteConceptDetailEvent.emit($event);
  }

  refreshConcept($event) {
    this.refreshSelector.emit($event);
  }
}
