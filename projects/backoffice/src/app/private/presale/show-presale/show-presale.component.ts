import { Component, OnInit, Inject, TemplateRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { StatePresales } from '../shared/enums/statePresalesEnum';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GetAdvancePaymentDTO } from '@cad-private/models/advance-payment/getAdvancePaymentDTO.model';
import { GetActorCommercialDTO } from '../shared/models/getActorCommercialDTO.model';
import { BusinessActorSelectorDTO } from '../shared/models/businessActorSelectorDTO.model';
import { getAllComprobantSelectorDTO } from '../shared/models/getAllComprobantSelectorDTO.model';
import { BusinessComprobantDTO } from '../shared/models/businessComprobantDTO.model';
import { ComprobantService } from '@cad-private/shared/services/comprobant/comprobant.service';
import { AdvancePaymentService } from '@cad-private/shared/services/advance-payment/advance-payment.service';
import { RegisterAdvancePaymentComponent } from '../register-advance-payment/register-advance-payment.component';
import { PresaleService } from '@cad-private/shared/services/presale/presale.service';
import { Router } from '@angular/router';
import { InformativeDialogComponent } from 'projects/ui-components/src/lib/informative-dialog/informative-dialog.component';
import { InvalidatePresaleComponent } from '../invalidate-presale/invalidate-presale.component';
import { ModalAlertComponent } from '@cad-private/generic-component/modal-alert/modal-alert.component';

@Component({
  selector: 'cad-show-presale',
  templateUrl: './show-presale.component.html',
  styleUrls: ['./show-presale.component.scss']
})
export class ShowPresaleComponent {
  @Output() finishPresaleEventToCloseModal: EventEmitter<any> = new EventEmitter();
  @ViewChild('representationComprobant', { static: true }) representationComprobant: ElementRef;
  htmlComprobant = '<p>Contenido HTML dinámico</p>';

  columns: any[];
  actions: any[];
  state: number = 2;
  presale: any;
  private STATE_CONFIRM: string = 'Confirmado';
  private STATE_REGISTER: string = 'Registrado';
  private STATE_FINALICE: string = 'Finalizado';
  private STATE_INVALID: string = 'Invalidado';

  representationImpresedDocumentViewer: string;
  transactionIdRepresentationImpresedDocument: number;

  selectedFormatPrint: number;
  formatPrints: any;
  settingsShowPresale: any;

  generalDataAdvancePayment: GetAdvancePaymentDTO;
  modalRef: BsModalRef;
  actorCommercial: GetActorCommercialDTO;
  listBusinessActorSearched: BusinessActorSelectorDTO[] = [];
  listComprobant: getAllComprobantSelectorDTO[] = [];
  showInvalidationOptions: boolean
  showFinishOptions: boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _translate: TranslateService,
    private _preSaleService: PresaleService,
    private modalService: BsModalService,
    private _advancePaymentService: AdvancePaymentService,
    private _comprobantService: ComprobantService,
    public dialog: MatDialog,
    private _router: Router
  ) {
    this.getPresaleById();
    this.getSettingsToShowPresale();

  }

  getPresaleById() {
    this._preSaleService.getPresaleById(this.data.Id).subscribe(response => {
      this.presale = response.data;
      this.representationImpresedDocumentViewer = this.presale.representationPrintedReceipt80mm;
      this.transactionIdRepresentationImpresedDocument = this.presale.id;
      this.setStatePresales(this.presale);
      this.valityShowFinish(this.presale.anticipos);
      // this.showInvalidationOptions = true;
    });
  }

  valityShowFinish(data) {
    if (data.length > 0) {
      this.showFinishOptions = data.some(ap => ap.isValid == true);
    }
  }


  getSettingsToShowPresale() {
    this._preSaleService.getSettingsShowPresale().subscribe(res => {
      this.settingsShowPresale = res.data;
      this.getFormatPrints();
    })
  }
  getFormatPrints() {
    this._comprobantService.getPrintFormats().subscribe(res => {
      this.formatPrints = res.data;
      this.selectedFormatPrint = this.settingsShowPresale.printFormatDeault;
    })
  }
  confirmPresaleManual() {
    this._preSaleService.confirmPresaleManual(this.presale.id).subscribe(res => {
      this.getPresaleById();
    })
  }

  labelTable() {
    this.columns = [
      { field: 'registrationDate', header: this.getTranslation('PRESALE.DATA.COLUMN.DATE') },
      { field: 'client', header: this.getTranslation('PRESALE.DATA.COLUMN.DOCUMENT') },
      { field: 'comprobant', header: this.getTranslation('PRESALE.DATA.COLUMN.ANTICIPOS') },
      { field: 'amount', header: this.getTranslation('PRESALE.DATA.COLUMN.DOC_IDENTITY') },
      { field: 'vality', header: this.getTranslation('PRESALE.DATA.COLUMN.BUSSINESS_NAME') },
      { field: 'reference', header: this.getTranslation('PRESALE.DATA.COLUMN.SELLER') },
    ];
    this.actions = [1, 0, 0];
  }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }


  setStatePresales(presale: any) {
    if (presale.stateID == StatePresales.CONFIRM) {
      presale.stateString = this.STATE_CONFIRM;
      this.showInvalidationOptions = true;
    } else if (presale.stateID == StatePresales.REGISTERED) {
      presale.stateString = this.STATE_REGISTER;
      this.showInvalidationOptions = true;
    } else if (presale.stateID == StatePresales.INVALID) {
      this.showInvalidationOptions = false;
      presale.stateString = this.STATE_INVALID;
    } else presale.stateString = this.STATE_FINALICE;
  }

  getAdvancePaymentByPresaleID() {
    this._advancePaymentService.getAdvancePaymentByPresaleID(this.data.Id).subscribe(response => {
      this.generalDataAdvancePayment = response.data;
      // console.log(this.generalDataAdvancePayment);
      this.openModal();
    })
  }

  openModal() {
    const dialogRef = this.dialog.open(RegisterAdvancePaymentComponent, {
      disableClose: true,
      data: this.generalDataAdvancePayment,
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.getPresaleById();
    });
  }

  getComprobantImpresedAdvancePayment(idAdvancedPaymentOrder: number) {
    const queryParams = {
      formatComprobantRepresentation: this.selectedFormatPrint,
      idAdvancedPaymentOrder: idAdvancedPaymentOrder
    };
    this._advancePaymentService.getAdvancedPaymentComprobantImpresed(queryParams).subscribe(res => {
      this.representationImpresedDocumentViewer = res.message;
      this.transactionIdRepresentationImpresedDocument = idAdvancedPaymentOrder;
    });

  }

  getComprobantRepresentationImpresedPresale() {
    const queryParams = {
      formatRepresentationImpresed: this.selectedFormatPrint,
      presaleOrderId: this.presale.id
    };

    this._preSaleService.getComprobantRepresentationImpresedPresale(queryParams).subscribe(res => {
      this.representationImpresedDocumentViewer = res.message;
    });

  }


  changeFormatPrintEvent($event) {
    this.selectedFormatPrint = $event.formatPrintComprobantRepresentationImpresed;
    this.getComprobantRepresentationImpresedPresaleByChangeFormat($event.formatPrintComprobantRepresentationImpresed, $event.transactionIdRepresentationImpresedDocument);
  }

  getComprobantRepresentationImpresedPresaleByChangeFormat(formatRepresentationImpresed: number, transacctionId: number) {
    if (transacctionId == this.presale.id) {
      const queryParams = {
        formatRepresentationImpresed: formatRepresentationImpresed,
        presaleOrderId: transacctionId
      };
      this._preSaleService.getComprobantRepresentationImpresedPresale(queryParams).subscribe(res => {
        this.representationImpresedDocumentViewer = res.message;
        this.transactionIdRepresentationImpresedDocument = transacctionId;
      });
    }
    if (this.presale.anticipos.find(ap => ap.id == transacctionId)) {
      const queryParams = {
        formatComprobantRepresentation: formatRepresentationImpresed,
        idAdvancedPaymentOrder: transacctionId
      };
      this._advancePaymentService.getAdvancedPaymentComprobantImpresed(queryParams).subscribe(res => {
        this.representationImpresedDocumentViewer = res.message;
        this.transactionIdRepresentationImpresedDocument = transacctionId;
      });
    }
    if (this.presale.sale.find(ap => ap.id == transacctionId)) {
      const queryParams = {
        saleId: transacctionId,
        formatRepresentationImpresed: this.selectedFormatPrint
      };
      this._preSaleService.getComprobantRepresentationImpresedSaleByPresale(queryParams).subscribe(res => {
        this.representationImpresedDocumentViewer = res.message;
        this.transactionIdRepresentationImpresedDocument = transacctionId;
      });

    }
  }

  finishPresale() {
    this._preSaleService.checkStock(this.presale.id).subscribe(response => {
      if (response.data) {
        this.finishPresaleEventToCloseModal.emit();
        this._router.navigate(['/private/preSale/finish-pre-sale', this.presale.id]);
      } else {

        const dialogRef = this.dialog.open(ModalAlertComponent, {
          panelClass: 'trend-dialog',
          disableClose: true,
          data: {
            Title: "Error",
            message: "No cuenta con el stock necesario para finalizar la preventa",
            BtnOk: "OK"
          },
        });
        dialogRef.backdropClick();

      }
    });
  }

  getComprobantRepresentationImpresedSaleByPresale(transacctionId: number) {
    const queryParams = {
      saleId: transacctionId,
      formatRepresentationImpresed: this.selectedFormatPrint
    };
    this._preSaleService.getComprobantRepresentationImpresedSaleByPresale(queryParams).subscribe(res => {
      this.representationImpresedDocumentViewer = res.message;
      this.transactionIdRepresentationImpresedDocument = transacctionId;
    })

  }

  showInvalitedDialog($event): void {
    // console.log(this.presale);
    var messageInvalidate = "Por favor acceda al ERP de SIGES para realizar esta acción, ya que hay comprobantes que no estan invalidados: "
    var invalidate = this.verifyForInvalidate();
    var message = this.presale.anticipos.length > 0 ? this.presale.anticipos.map(item => item.comprobant).join('') : "";
    messageInvalidate = messageInvalidate + message;

    const dialogRef = this.dialog.open(InvalidatePresaleComponent, {
      disableClose: true,
      data: {
        invalidate: invalidate,
        message: messageInvalidate,
        orderID: this.presale.id
      },
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.getPresaleById();
    });



  }

  verifyForInvalidate(): boolean {
    var response = true;
    if (this.presale.anticipos.length > 0 || this.presale.sale.length > 0) response = !response
    return response;
  }
}
