import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PresaleService } from '@cad-private/shared/services/presale/presale.service';
import { ComprobantService } from '@cad-private/shared/services/comprobant/comprobant.service';
import { saleByPresaleDTO } from '../shared/models/SaleByPresaleDTO.model';
import { PaymentTraceDTO } from '@cad-private/transactions/shared/models/payDetailDTO.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowPresaleComponent } from '../show-presale/show-presale.component';

@Component({
  selector: 'cad-finish-presale',
  templateUrl: './finish-presale.component.html',
  styleUrls: ['./finish-presale.component.scss']
})
export class FinishPresaleComponent implements OnInit {

  presaleId: number;
  operation: any;
  sale: saleByPresaleDTO;
  parameter: any;
  validateSaleToSaveOperation: boolean;

  //multipay
  parameterForPaymentMode: any;
  paymentMethods: any;
  parameterPaymentMethods: any;
  bankAccounts: any;
  financialEntities: any;
  cards: any;
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private _presaleService: PresaleService, private comprobantService: ComprobantService, private _router: Router) { }
  GetDataForMultipay() {
    this._presaleService.getParameterForPaymentMode().subscribe(response => {
      this.parameterForPaymentMode = response.data;
    })

    this._presaleService.getPaymentMethod().subscribe(response => {
      this.paymentMethods = response;
    })

    this._presaleService.getParameterForPaymentMethod().subscribe(response => {
      this.parameterPaymentMethods = response.data;
    })
    this._presaleService.GetBankAccountsWithFinancialEntityWithCurrency().subscribe(response => {
      this.bankAccounts = response;
    })

    this._presaleService.getFinancialEntities().subscribe(response => {
      this.financialEntities = response;
      this.financialEntities.splice(0, 1);
    })

    this._presaleService.getOperatorsCard().subscribe(response => {
      this.cards = response;
    })
  }
  ngOnInit(): void {
    this.inicializeVaribles();
    this.route.params.subscribe(params => {
      this.presaleId = +params['presaleId'];
    });
    this.getResumeToFinishPresale();
    this.GetDataForMultipay();

  }

  inicializeVaribles() {
    this.sale = new saleByPresaleDTO();
  }
  getResumeToFinishPresale() {
    this._presaleService.getResumeToFinishPresale(this.presaleId).subscribe(res => {
      this.operation = res.data;
      this.sale.order.client = this.operation.clientAdvancePayment;
      this.sale.presaleOrderId = this.presaleId;
      this.sale.presaleId = this.operation.presaleId;
      this.sale.order.total = this.operation.importTotal;
      this._presaleService.getSettingsFinishPresale().subscribe(res => {
        this.parameter = res.data;
        this.resolveIgvSale();
      });
      this.validateFinishPresaleToSaveOperation();
    });
  }
  setActorComercial($event) {
    console.log($event);

  }
  setComprobant($event) {
    this.sale.order.comprobant.push($event);
  }
  setPayData(event) {
    var trace: PaymentTraceDTO[] = [];
    for (var i = 0; i < event.traza.length; i++) {
      var traceDetail = new PaymentTraceDTO();
      traceDetail.payInformation.importToPay = event.traza[i].info.importAPay;
      traceDetail.payInformation.importDelivered = event.traza[i].info.amountDelivered;
      traceDetail.payInformation.bankAccount.id = (event.traza[i].info.bankAccountId == '' || event.traza[i].info.bankAccountId == null) ? 0 : event.traza[i].info.bankAccountId;
      traceDetail.payInformation.financialEntity.id = (event.traza[i].info.financialEntityId == '' || event.traza[i].info.financialEntityId == null) ? 0 : event.traza[i].info.financialEntityId;
      traceDetail.payInformation.bankAccount.value = (event.traza[i].info.bankAccountValue == '' || event.traza[i].info.bankAccountValue == null) ? 0 : event.traza[i].info.bankAccountValue;
      traceDetail.payInformation.operatorCard.id = (event.traza[i].info.carOperatorId == '' || event.traza[i].info.carOperatorId == null) ? 0 : event.traza[i].info.carOperatorId;
      traceDetail.paymentMethod.id = event.traza[i].paymentMethodId;
      traceDetail.paymentMethod.name = event.traza[i].paymentMethodName;
      trace.push(traceDetail);
    };
    this.sale.pay.payMode = event.paymentMode;
    this.sale.pay.total = event.total;
    this.sale.pay.trace = trace;
    this.validateFinishPresaleToSaveOperation();
  }
  finishPresale() {
    this._presaleService.createSaleByPresale(this.sale).subscribe(res => {
      this._router.navigate(['/private/preSale']);
    })
  }
  resolveIgvSale() {
    if (this.operation.applyIgv) {
      this.sale.order.gravada = (!this.parameter.ApplyAmazonLaw) ? parseFloat((
        (this.sale.order.total / (1 + this.parameter.igvRate))).toFixed(this.parameter.decimalNumbersInPrice)) : 0;
      this.sale.order.igv = (!this.parameter.ApplyAmazonLaw) ? parseFloat((this.sale.order.total -
        (this.sale.order.total / (1 + this.parameter.igvRate))).toFixed(this.parameter.decimalNumbersInPrice)) : 0;
      this.sale.order.exoneration = 0;
    } else {
      this.sale.order.exoneration = this.sale.order.total;
      this.sale.order.gravada = 0;
      this.sale.order.igv = 0;
    }
  }

  validateFinishPresaleToSaveOperation() {
    var sumImportDelivered = 0;
    if (this.sale.pay.trace != null) {
      this.sale.pay.trace.forEach(
        t => {
          sumImportDelivered = sumImportDelivered + t.payInformation.importDelivered;
        });
    }
    if (sumImportDelivered == this.sale.order.total) {
      this.validateSaleToSaveOperation = true;
    } else {
      this.validateSaleToSaveOperation = false;
    }
  }

  back() {
    this._router.navigate(['/private/preSale']);
    this.openShow(this.presaleId);
  }

  openShow($event: number): void {
    const dialogRef = this.dialog.open(ShowPresaleComponent, {
      panelClass: 'trend-dialog',
      disableClose: true,
      height: '90%',
      data: {
        Id: $event,
      },
    });
    dialogRef.backdropClick();
    // Captura el evento emitido desde ShowPresaleComponent
    dialogRef.componentInstance.finishPresaleEventToCloseModal.subscribe(() => {
      dialogRef.close(); // Cierra el modal
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getAllVehicleInspections();
      // this.searchPresales();
    });
  }
}
