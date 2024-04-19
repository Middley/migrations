import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cad-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent {


  @Input() columns: any[];
  @Input() items: any;
  @Input() totalAmount: number;
  @Input() activeRowsSpan: Boolean;
  @Input() columnRowSpan: any[];







}
