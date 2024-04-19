import { Component, Input } from '@angular/core';

@Component({
  selector: 'cad-table-confirm-invalid-detail',
  templateUrl: './table-confirm-invalid-detail.component.html',
  styleUrls: ['./table-confirm-invalid-detail.component.scss']
})
export class TableConfirmInvalidDetailComponent {

  @Input() itemsConfirm: any[];
  @Input() itemsInvalid: any[];
  @Input() itemsDetail: any[];
  @Input() columnSummary: any[];
  @Input() columnDetail: any[];

  @Input() totalAmountItemsConfirm: number;
  @Input() totalAmountItemsInvalid: number;
  @Input() totalAmountDetail: number;

  ngOnInit() {
    // this.calcTotalAmount();
  }
}
