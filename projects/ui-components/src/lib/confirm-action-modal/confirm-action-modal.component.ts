import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';


@Component({
  selector: 'cad-confirm-action-modal',
  templateUrl: './confirm-action-modal.component.html',
  styleUrls: ['./confirm-action-modal.component.scss']
})
export class ConfirmActionModalComponent {
  @Input() titleModal: string;
  @Input() subTitleModal: string;
  @Input() messageInputModal: string;
  @Input() exampleInputModal: string;
  @Input() question: string;
  @Input() buttonAccept: any;
  @Input() buttonDeny: any;


}
