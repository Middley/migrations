import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { PagedResponse } from '@cad-private/shared/models/Generic/PagedResponse.model';
import { PresaleService } from '@cad-private/shared/services/presale/presale.service';
import { TranslateService } from '@ngx-translate/core';
import { ReportType } from 'projects/backoffice/src/assets/enums/ReportTypeEnum';

@Component({
  selector: 'cad-report-sale-by-presale',
  templateUrl: './report-sale-by-presale.component.html',
  styleUrls: ['./report-sale-by-presale.component.scss'],
  providers: [DatePipe],
})
export class ReportSaleByPresaleComponent {

  columSummary: any[];
  columnDetail: any[];
  paginated: PagedResponse;
  filters: any;
  titleReport: string = this.getTranslation('PRESALE.TITLES.REPORT_SALE_BY_PRESALE');
  reportType: number = ReportType.tableConfirmInvalidDetail;
  pageSizeOptions = [5, 10, 25];
  itemsConfirmed: any[] = [];
  itemsInvalid: any[] = [];
  totalAmountItemsConfirm: number = 0;
  totalAmountItemsInvalid: number = 0;
  totalDetails: number = 0;
  logo: any;
  data: any;

  constructor(
    private _translate: TranslateService,
    private _presaleService: PresaleService,
    private datePipe: DatePipe) {
    this.labelTable();
  }

  ngOnInit() {
    if (history.state.data) {
      this.filters = history.state.data;
      this.getReportSaleByPresale();
    }
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

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  setPaginated($event) {
    this.filters.pageNumber = $event.pageIndex + 1;
    this.filters.pageSize = $event.pageSize;
  }

  getReportSaleByPresale() {
    this.itemsConfirmed = [];
    this.itemsInvalid = [];
    this._presaleService.getReportSaleByPresale(this.filters).subscribe(response => {
      this.setData(response.data);
      this.calcTotalAmount(this.itemsConfirmed, this.itemsInvalid, this.paginated.items);
    });
  }

  setData(data) {
    this.data = data;
    this.logo = data.logo;

    this.itemsConfirmed.push({
      category: 'Confirmado',
      items: data.confirmTransactions
    });
    this.itemsInvalid.push({
      category: 'Invalidado',
      items: data.invalidTransactions
    });

    this.paginated = data.detail;

    this.paginated.items.map(x => {
      x.registrationDate = this.datePipe.transform(x.registrationDate, 'dd-MM-YYYY');
    })
  }

  calcTotalAmount(itemsConfirm, itemsInvalid, itemsDetail) {
    this.totalAmountItemsConfirm = itemsConfirm[0].items.reduce((count, item) => count + item.amount, 0);
    this.totalAmountItemsInvalid = itemsInvalid[0].items.reduce((count, item) => count + item.amount, 0);
    this.totalDetails = itemsDetail.reduce((count, item) => count + item.amount, 0);
  }

}
