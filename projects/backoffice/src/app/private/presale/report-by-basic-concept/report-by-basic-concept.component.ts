import { Component } from '@angular/core';
import { PagedResponse } from '@cad-private/shared/models/Generic/PagedResponse.model';
import { PresaleService } from '@cad-private/shared/services/presale/presale.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ReportType } from 'projects/backoffice/src/assets/enums/ReportTypeEnum';

@Component({
  selector: 'cad-report-by-basic-concept',
  templateUrl: './report-by-basic-concept.component.html',
  styleUrls: ['./report-by-basic-concept.component.scss'],
  providers: [DatePipe],
})
export class ReportByBasicConceptComponent {

  filters: any;
  columnSummary: any[];
  columnDetail: any[];
  data: any;


  paginated: PagedResponse;
  itemsSummary: any[] = [];

  logo: any;

  totalDetail: number;
  totalAmountSummary: number;

  titleReport: string = this.getTranslation('PRESALE.TITLES.PRESALE_FOR_BASIC_CONCEPT');
  pageSizeOptions = [5, 10, 25];
  reportType: number = ReportType.tableSummaryAndDetail;

  constructor(
    private _translate: TranslateService,
    private _presaleService: PresaleService,
    private datePipe: DatePipe,) {
    this.labelTable();
  }

  ngOnInit() {
    if (history.state.data) {
      this.filters = history.state.data;
      this.getReportByBasicConcept();
    }
  }

  labelTable() {
    this.columnSummary = [
      { field: 'basicConceptName', header: this.getTranslation('PRESALE.DATA.BASIC_CONCEPT') },
      { field: 'quantity', header: this.getTranslation('PRESALE.DATA.QUANTITY') },
      { field: 'amount', header: this.getTranslation('PRESALE.DATA.COLUMN.TOTAL') }
    ];

    this.columnDetail = [
      { field: 'registrationDate', header: this.getTranslation('PRESALE.DATA.EMITED_DATE') },
      { field: 'businessConceptName', header: this.getTranslation('PRESALE.DATA.CONCEPT') },
      { field: 'quantity', header: this.getTranslation('PRESALE.DATA.QUANTITY') },
      { field: 'unitPrice', header: this.getTranslation('PRESALE.DATA.UNIT_PRICE') },
      { field: 'amount', header: this.getTranslation('PRESALE.DATA.IMPORT') },
    ];
  }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  setPaginated($event) {
    this.filters.pageNumber = $event.pageIndex + 1;
    this.filters.pageSize = $event.pageSize;
    this.getReportByBasicConcept();
  }


  getReportByBasicConcept() {
    this.itemsSummary = [];
    this._presaleService.getReportByBasicConcept(this.filters).subscribe(response => {
      this.data = response.data;
      this.logo = response.data.logo;
      this.paginated = response.data.paginated;
      this.itemsSummary = response.data.summary;

      this.paginated.items.map(item => {
        item.items.map(x => {
          x.registrationDate = this.datePipe.transform(x.registrationDate, 'dd-MM-YYYY');
        })
      });

      this.totalDetail = this.paginated.items.reduce((count, item) => count + item.subTotal, 0);;
      this.totalAmountSummary = this.itemsSummary.reduce((count, item) => count + item.amount, 0);

    });
  }
}
