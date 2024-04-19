import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ChangeFormantPrint } from '../model/comprobant-viewer/changeFormatPrint.model';

@Component({
  selector: 'cad-comprobant-viewer',
  templateUrl: './comprobant-viewer.component.html',
  styleUrls: ['./comprobant-viewer.component.scss']
})
export class ComprobantViewerComponent implements AfterViewInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.representationPrintComprobant) {
      document.getElementById("representationPrintComprobant").innerHTML = this.representationPrintComprobant;
    }
  }

  ngAfterViewInit(): void {
    document.getElementById("representationPrintComprobant").innerHTML = this.representationPrintComprobant;
  }
  @Input() fromatPrints: any;
  @Input() selectedFormatPrint: any;
  @Input() representationPrintComprobant;
  @Input() transactionIdRepresentationImpresedDocument: number;
  @Input() printFormat80mmId: number;
  @Input() printFormatA4Id: number;
  @Input() showInvalidationOptions: boolean;
  @Output() changeFormatPrintEvent = new EventEmitter<ChangeFormantPrint>();
  @Output() invalidateEvent = new EventEmitter<ChangeFormantPrint>();

  printDocumentImpresed() {
    var printWin = window.open(' ', '');
    printWin.document.write(this.representationPrintComprobant);
    printWin.document.close();
    printWin.focus();
    printWin.print();
    printWin.close();
  }
  changeFormatPrint($event) {
    var changeFormantPrint = new ChangeFormantPrint();
    changeFormantPrint.formatPrintComprobantRepresentationImpresed = $event;
    changeFormantPrint.transactionIdRepresentationImpresedDocument = this.transactionIdRepresentationImpresedDocument;
    this.changeFormatPrintEvent.emit(changeFormantPrint);
  }

  invalidate(value) {
    this.invalidateEvent.emit(value);
  }
}
