import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cad-informative-dialog',
  templateUrl: './informative-dialog.component.html',
  styleUrls: ['./informative-dialog.component.scss']
})
export class InformativeDialogComponent {
  @Input() TitleModal: string;
  @Input() Body: string;
  @Input() BtnOk: string;
  @Input() BtnCancel: string;


  @Output() response = new EventEmitter<any>();

  ngOnInit() {

  }

  Ok(confirm) {
    this.response.emit(confirm);
  }
}
