import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { GetConceptByIdWithComplementsDTO } from '@cad-private/presale/shared/models/getConceptByIdWithComplementsDTO.model';
import { OperationDetail } from '@cad-private/presale/shared/models/operationDetail.model';
import { calculateValuesDetail } from '../../shared/concept-detail-models/calcute-values-detail.model';

@Component({
  selector: 'cad-concept-detail',
  templateUrl: './concept-detail.component.html',
  styleUrls: ['./concept-detail.component.scss']
})
export class ConceptDetailComponent implements OnInit {

  @Input() conceptDetails: OperationDetail[];
  @Input() conceptDetailParameters: any;


  //Events
  @Output() changeAmountConceptDetailEvent = new EventEmitter<calculateValuesDetail>();
  @Output() changeUnitPriceConceptDetailEvent = new EventEmitter<calculateValuesDetail>();
  @Output() changeImportConceptDetailEvent = new EventEmitter<calculateValuesDetail>();
  @Output() changeTariffConceptDetailEvent = new EventEmitter<calculateValuesDetail>();
  @Output() deleteConceptDetailEvent = new EventEmitter<number>();


  ngOnInit(): void {
  }

  changeAmountConceptDetail(identifier, index) {

    var calculateValuesDetailObject = new calculateValuesDetail();
    calculateValuesDetailObject.identifier = identifier;
    calculateValuesDetailObject.index = index;
    this.changeAmountConceptDetailEvent.emit(calculateValuesDetailObject);
  }

  changeUnitPriceConceptDetail(identifier, index) {
    var calculateValuesDetailObject = new calculateValuesDetail();
    calculateValuesDetailObject.identifier = identifier;
    calculateValuesDetailObject.index = index;
    this.changeUnitPriceConceptDetailEvent.emit(calculateValuesDetailObject);
  }

  changeImportConceptDetail(identifier, index) {
    var calculateValuesDetailObject = new calculateValuesDetail();
    calculateValuesDetailObject.identifier = identifier;
    calculateValuesDetailObject.index = index;
    this.changeImportConceptDetailEvent.emit(calculateValuesDetailObject);
  }
  changeTariffConceptDetail(identifier, index) {
    var calculateValuesDetailObject = new calculateValuesDetail();
    calculateValuesDetailObject.identifier = identifier;
    calculateValuesDetailObject.index = index;
    this.changeTariffConceptDetailEvent.emit(calculateValuesDetailObject);
  }
  deleteDetail(index) {
    this.deleteConceptDetailEvent.emit(index);
  }

}
