import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PagedResponse } from '@cad-private/shared/models/Generic/PagedResponse.model';

@Component({
  selector: 'cad-table-by-group',
  templateUrl: './table-by-group.component.html',
  styleUrls: ['./table-by-group.component.scss']
})
export class TableByGroupComponent {
  @Input() columns: any[];
  @Input() items: any;
  @Input() totalAmount: number;

}


