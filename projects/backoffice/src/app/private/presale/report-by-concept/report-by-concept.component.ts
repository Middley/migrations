import { Component } from '@angular/core';
import { PagedResponse } from '@cad-private/shared/models/Generic/PagedResponse.model';
import { PresaleService } from '@cad-private/shared/services/presale/presale.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ReportType } from 'projects/backoffice/src/assets/enums/ReportTypeEnum';

@Component({
  selector: 'cad-report-by-concept',
  templateUrl: './report-by-concept.component.html',
  styleUrls: ['./report-by-concept.component.scss'],
  providers: [DatePipe],
})
export class ReportByConceptComponent {
  filters: any;
  total: number;
  columns: any[];
  paginated: PagedResponse;
  pageSizeOptions = [5, 10, 25];
  titleReport: string = this.getTranslation('PRESALE.TITLES.PRESALE_FOR_CONCEPT');
  reportType: number = ReportType.tableByGroup;
  logo: any;
  data: any;


  constructor(
    private _translate: TranslateService,
    private _presaleService: PresaleService,
    private datePipe: DatePipe,) {
    this.labelTable();
  }

  ngOnInit() {
    if (history.state.data) {
      this.filters = history.state.data;
      this.getReportByConcept();
    }
  }

  labelTable() {
    this.columns = [
      { field: 'registrationDate', header: this.getTranslation('PRESALE.DATA.DATE') },
      { field: 'comprobant', header: this.getTranslation('PRESALE.DATA.COMPROBANT') },
      { field: 'stateName', header: this.getTranslation('PRESALE.DATA.STATE') },
      { field: 'quantity', header: this.getTranslation('PRESALE.DATA.QUANTITY') },
      { field: 'identityDocument', header: this.getTranslation('PRESALE.DATA.RUC_DNI') },
      { field: 'businessName', header: this.getTranslation('PRESALE.DATA.COLUMN.BUSSINESS_NAME') },
      { field: 'unitPrice', header: this.getTranslation('PRESALE.DATA.UNIT_PRICE') },
      { field: 'amount', header: this.getTranslation('PRESALE.DATA.IMPORT') },
    ];
  }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  getReportByConcept() {
    this._presaleService.getReportByConcept(this.filters).subscribe(response => {
      this.data = response.data;
      this.paginated = response.data.paginated;
      this.logo = response.data.logo;
      this.paginated.items.map(item => {
        item.items.map(x => {
          x.registrationDate = this.datePipe.transform(x.registrationDate, 'dd-MM-YYYY');
        })
      })
      this.total = response.data.total;
    });
  }

  setPaginated($event) {
    this.filters.pageNumber = $event.pageIndex + 1;
    this.filters.pageSize = $event.pageSize;
    this.getReportByConcept();
  }
}
