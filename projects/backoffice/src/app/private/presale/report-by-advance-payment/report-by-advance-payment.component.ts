import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { PagedResponse } from '@cad-private/shared/models/Generic/PagedResponse.model';
import { PresaleService } from '@cad-private/shared/services/presale/presale.service';
import { TranslateService } from '@ngx-translate/core';
import { ReportType } from 'projects/backoffice/src/assets/enums/ReportTypeEnum';

@Component({
  selector: 'cad-report-by-advance-payment',
  templateUrl: './report-by-advance-payment.component.html',
  styleUrls: ['./report-by-advance-payment.component.scss'],
  providers: [DatePipe],
})
export class ReportByAdvancePaymentComponent {

  filters: any;
  total: number;
  columSummary: any[];
  columnDetail: any[];
  paginated: PagedResponse;
  pageSizeOptions = [5, 10, 25];
  titleReport: string = this.getTranslation('PRESALE.DATA.ACTICIPO');
  reportType: number = ReportType.tableConfirmInvalidDetail;
  itemsConfirmed: any[] = [];
  itemsInvalid: any[] = [];
  logo: any;
  data: any;

  totalAmountItemsConfirm: number = 0;
  totalAmountItemsInvalid: number = 0;
  totalDetails: number = 0;

  constructor(
    private _translate: TranslateService,
    private _presaleService: PresaleService,
    private datePipe: DatePipe,) {
    this.labelTable();
  }

  ngOnInit() {
    if (history.state.data) {
      this.filters = history.state.data;
      this.getReportByAdvancePayment();
    }
  }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  labelTable() {
    this.columSummary = [
      { field: 'comprobant', header: this.getTranslation('PRESALE.DATA.COMPROBANT') },
      { field: 'serie', header: this.getTranslation('PRESALE.DATA.SERIE') },
      { field: 'firstNumber', header: this.getTranslation('PRESALE.DATA.FIRST_NUMBER') },
      { field: 'lastNumber', header: this.getTranslation('PRESALE.DATA.LAST_NUMBER') },
      { field: 'saleValue', header: this.getTranslation('PRESALE.DATA.SALE_VALUE') },
      { field: 'igv', header: this.getTranslation('PRESALE.DATA.IGV') },
      { field: 'icper', header: this.getTranslation('PRESALE.DATA.ICBPER') },
      { field: 'amount', header: this.getTranslation('PRESALE.DATA.IMPORT') },
    ];

    this.columnDetail = [
      { field: 'type', header: this.getTranslation('PRESALE.DATA.TYPE') },
      { field: 'serie', header: this.getTranslation('PRESALE.DATA.SERIE') },
      { field: 'comprobantNumber', header: this.getTranslation('PRESALE.DATA.NUMBER') },
      { field: 'registrationDate', header: this.getTranslation('PRESALE.DATA.EMITED_DATE') },
      { field: 'identityDocument', header: this.getTranslation('PRESALE.DATA.RUC_DNI') },
      { field: 'businessName', header: this.getTranslation('PRESALE.DATA.COLUMN.BUSSINESS_NAME') },
      { field: 'taxBase', header: this.getTranslation('PRESALE.DATA.TAX_BASE') },
      { field: 'igv', header: this.getTranslation('PRESALE.DATA.IGV') },
      { field: 'icbper', header: this.getTranslation('PRESALE.DATA.ICBPER') },
      { field: 'amount', header: this.getTranslation('PRESALE.DATA.IMPORT') },
    ];
  }

  setPaginated($event) {
    this.filters.pageNumber = $event.pageIndex + 1;
    this.filters.pageSize = $event.pageSize;
    this.getReportByAdvancePayment();
  }

  getReportByAdvancePayment() {
    this.itemsConfirmed = [];
    this.itemsInvalid = [];
    this._presaleService.getReportByAdvancePayment(this.filters).subscribe(response => {
      this.setData(response.data);
    });
  }

  setData(data) {
    this.data = data;
    this.logo = data.logo;
    this.itemsConfirmed.push({
      category: 'Confirmado',
      items: data.reportConfirmed
    });
    this.itemsInvalid.push({
      category: 'Invalidado',
      items: data.reportInvalidated
    });

    this.paginated = data.summaryDetail;

    this.paginated.items.map(x => {
      x.registrationDate = this.datePipe.transform(x.registrationDate, 'dd-MM-YYYY');
    })
    this.calcTotalAmount(this.itemsConfirmed, this.itemsInvalid, this.paginated.items);
  }

  calcTotalAmount(itemsConfirm, itemsInvalid, itemsDetail) {
    this.totalAmountItemsConfirm = itemsConfirm[0].items.reduce((count, item) => count + item.amount, 0);
    this.totalAmountItemsInvalid = itemsInvalid[0].items.reduce((count, item) => count + item.amount, 0);
    this.totalDetails = itemsDetail.reduce((count, item) => count + item.amount, 0);
  }
}
