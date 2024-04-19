import { Component, Input } from '@angular/core';

@Component({
  selector: 'cad-table-summary-and-detail',
  templateUrl: './table-summary-and-detail.component.html',
  styleUrls: ['./table-summary-and-detail.component.scss']
})
export class TableSummaryAndDetailComponent {

  @Input() columnSummary: any[];
  @Input() columnDetail: any[];

  @Input() itemsSummary: any[];
  @Input() itemsDetail: any[];

  @Input() totalAmountSummary: number;
  @Input() totalAmountDetail: number;


}
