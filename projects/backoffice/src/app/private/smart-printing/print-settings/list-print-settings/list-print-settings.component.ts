import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ShowPrintSettingsComponent } from '../show-print-settings/show-print-settings.component';
import { RegisterPrintSettingsComponent } from '../register-print-settings/register-print-settings.component';
import { EditPrintSettingsComponent } from '../edit-print-settings/edit-print-settings.component';
import { UnsuscribePrintSettingsComponent } from '../unsuscribe-print-settings/unsuscribe-print-settings.component';
import { PrintSettingService } from '../shared/services/printSetting-service.service';
import { CustomTitleService } from '@cad-shared/services/custom-title.service';
import { SignalRSmartPrintingService } from '@cad-public/login/shared/signal-rsmart-printing.service';

@Component({
  selector: 'cad-list-print-settings',
  templateUrl: './list-print-settings.component.html',
  styleUrls: ['./list-print-settings.component.scss'],
  providers: [DatePipe],
})
export class ListPrintSettingsComponent implements OnInit {
  private PAGE_SIZE_DEFAULT: string = '900';
  private PAGE_NUMBER_DEFAULT: string = '1';
  columns: any[];
  actions: any[];
  data: any[] = [];
  stockData: string[] = [];
  constructor(
    public dialog: MatDialog,
    private _fb: FormBuilder,
    private datePipe: DatePipe,
    private customTitle: CustomTitleService,
    private printSettingService: PrintSettingService,
    private signalRService: SignalRSmartPrintingService
  ) {
    customTitle.set('Configuración de Impresión');
    this.labelTable();
    this.printSettingService.listen().subscribe((m: any) => {
      this.getAllPrintSettings();
    });
  }

  ngOnInit(): void {
    this.getAllPrintSettings();
    this.signalRService.startConnection();
    // this.signalRService.addReceiveStockPriceListener((stockName, stockPrice) => {
    //   this.stockData.push(`${stockName}: ${stockPrice}`);
    // });

  }

  labelTable() {
    this.columns = [
      { field: 'serviceCenter', header: 'CENTRO DE ATENCIÓN' },
      { field: 'printableDocument', header: 'DOCUMENTO IMPRIMIBLE' },
      { field: 'printer', header: 'IMPRESORA' },
      { field: 'state', header: 'ESTADO' },
    ];
    this.actions = [0, 1, 1];
  }

  getAllPrintSettings() {
    const queryParams = { pageSize: this.PAGE_SIZE_DEFAULT, pageNumber: this.PAGE_NUMBER_DEFAULT };
    this.printSettingService.getAllPrintSettings(queryParams).subscribe(res => {
      this.data = res;
    });
  }

  openShow($event: number): void {
    const dialogRef = this.dialog.open(ShowPrintSettingsComponent, {
      disableClose: true,
      data: {
        Id: $event,
      },
    });
    dialogRef.backdropClick();
  }
  openEdit($event: number): void {
    const dialogRef = this.dialog.open(EditPrintSettingsComponent, {
      disableClose: true,
      data: {
        Id: $event,
      },
    });
    dialogRef.backdropClick();
  }
  openUnsuscribe($event: number): void {
    const dialogRef = this.dialog.open(UnsuscribePrintSettingsComponent, {
      disableClose: true,
      data: {
        Id: $event,
      },
    });
    dialogRef.backdropClick();
  }

  openRegister() {
    const dialogRef = this.dialog.open(RegisterPrintSettingsComponent, {
      disableClose: true,
    });
    dialogRef.backdropClick();
  }
  callPrinterServicceHub() {
    this.signalRService.invokePrinterServiceHub();
  }
}
