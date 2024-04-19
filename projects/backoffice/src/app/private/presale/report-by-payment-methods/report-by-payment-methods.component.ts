import { Component } from '@angular/core';
import { PresaleService } from '@cad-private/shared/services/presale/presale.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { PagedResponse } from '@cad-private/shared/models/Generic/PagedResponse.model';
import { ReportType } from 'projects/backoffice/src/assets/enums/ReportTypeEnum';

@Component({
  selector: 'cad-report-by-payment-methods',
  templateUrl: './report-by-payment-methods.component.html',
  styleUrls: ['./report-by-payment-methods.component.scss'],
  providers: [DatePipe],
})
export class ReportByPaymentMethodsComponent {

  columns: any[];
  paginated: PagedResponse;
  filters: any;
  titleReport: string = this.getTranslation('PRESALE.TITLES.REPORT_BY_PAYMENT_METHODS');
  reportType: number = ReportType.tableDetail;
  pageSizeOptions = [5, 10, 25];
  columnRowSpan: any[];
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
      this.getReportByPaymentMethod();
    }
  }

  labelTable() {
    this.columns = [
      { field: 'registrationDate', header: this.getTranslation('PRESALE.DATA.DATE') },
      { field: 'comprobant', header: this.getTranslation('PRESALE.DATA.COMPROBANT') },
      { field: 'referenceComprobant', header: this.getTranslation('PRESALE.DATA.COMPROBANT_REFERENCE') },
      { field: 'stateName', header: this.getTranslation('PRESALE.DATA.STATE') },
      { field: 'client', header: this.getTranslation('PRESALE.DATA.CLIENT') },
      { field: 'paymentMethod', header: this.getTranslation('PRESALE.DATA.PAYMENT_METHODS') },
      { field: 'information', header: this.getTranslation('PRESALE.DATA.INFORMATION') },
      { field: 'amount', header: this.getTranslation('PRESALE.DATA.IMPORT') },
    ];

    this.columnRowSpan = ['registrationDate', 'comprobant', 'referenceComprobant', 'stateName', 'client'];

  }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  setPaginated($event) {
    this.filters.pageNumber = $event.pageIndex + 1;
    this.filters.pageSize = $event.pageSize;
    this.getReportByPaymentMethod();
  }

  getReportByPaymentMethod() {
    this._presaleService.getReportByPaymentMethod(this.filters).subscribe(response => {

      this.data = response.data;
      this.logo = response.data.logo;
      this.paginated = response.data.paymentMethods;
      this.paginated.items.map(x => {
        x.registrationDate = this.datePipe.transform(x.registrationDate, 'dd-MM-YYYY');
      })
      // this.total = response.data.total;
      this.processData(this.paginated);
    });
  }

  private processData(paginated) {
    const count = paginated.items
      .reduce((accum, { comprobant }) => {
        accum[comprobant] = accum[comprobant] ? accum[comprobant] + 1 : 1;
        return accum;
      }, {});

    this.paginated.items = paginated.items
      .sort((a, b) => a.comprobant.localeCompare(b.comprobant))
      .map(entry => {
        const span = count[entry.comprobant] > 0 ? count[entry.comprobant] : 0;
        count[entry.comprobant] = 0;
        return { ...entry, span };
      });
  }
}


