
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PagedResponse } from '@cad-private/shared/models/Generic/PagedResponse.model';
import * as XLSX from 'xlsx';
import { PageEvent } from '@angular/material/paginator';
import { ReportType } from 'projects/backoffice/src/assets/enums/ReportTypeEnum';
import { DomSanitizer } from '@angular/platform-browser';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'cad-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.scss']
})
export class ReportViewerComponent {

  @Input() logo;
  @Input() titleReport: string;
  @Input() reportType: number;

  @Input() columns: any[]; //detail
  @Input() columnSummary: any[]; //summary

  @Input() itemsConfirm: any[];
  @Input() itemsInvalid: any[];
  @Input() itemsSummary: any[];
  @Input() paginated: PagedResponse;

  @Input() totalAmountConfirmed: number;
  @Input() totalAmountInvalid: number;
  @Input() totalAmountSummary: number;//total amount summary
  @Input() totalAmount: number;//total amount items details

  @Input() length: number;
  @Input() pageSize: number;
  @Input() pageIndex: number;
  @Input() pageSizeOptions: number[];
  @Input() columnRowSpan: any[];
  @Input() activeRowsSpan: Boolean;
  @Input() filters: any[];
  @Input() User: string;
  @Input() ReportDate: Date;



  reportTypeByGroup: number = ReportType.tableByGroup;
  reportTypeSummaryAndDetail: number = ReportType.tableSummaryAndDetail;
  reportTypeConfirmInvalidDetail: number = ReportType.tableConfirmInvalidDetail;
  reportTypeDetail: number = ReportType.tableDetail;

  @Output() paginatedEvent = new EventEmitter<any>();

  showPageSizeOptions = true;
  showFirstLastButtons = true;

  pageEvent: PageEvent;

  fileName: string = 'ReporteDetallado.xlsx';
  tableDetailID: string = 'table-detail';

  @ViewChild('content') content: ElementRef;

  constructor(private _sanitizer: DomSanitizer) {
  }

  transform() {
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.logo);
  }

  ngOnInit() {
    if (this.logo) {
      this.logo = "data:image/png;base64," + this.logo;
    }
  }

  exportTableDetailExcel(): void {
    /* pass here the table id */
    let element = document.getElementById(this.tableDetailID);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }



  exportAllToPDF() {

    const elementPrint: any = document.getElementById('theContent');
    html2canvas(elementPrint, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298)
      pdf.setProperties({
        title: 'Reporte',
        subject: 'PDF',
        author: 'TSP'
      });

      pdf.setFontSize(12);
      // pdf.text('radom Text', 14, 22);
      pdf.save('Reporte.pdf');
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    // console.log(e);

    const paginated = {
      length: this.length,
      pageSize: this.pageSize,
      pageIndex: this.pageIndex
    }

    this.paginatedEvent.emit(paginated);
  }




}
