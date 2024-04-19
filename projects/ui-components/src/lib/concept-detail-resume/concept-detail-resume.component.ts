import { Component, Input } from '@angular/core';

@Component({
  selector: 'cad-concept-detail-resume',
  templateUrl: './concept-detail-resume.component.html',
  styleUrls: ['./concept-detail-resume.component.scss']
})
export class ConceptDetailResumeComponent {

  @Input() operationSubTotal: number;
  @Input() operationIgv: number;
  @Input() operationIcbper: number;
  @Input() operationTotal: number;

}
