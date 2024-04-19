import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { ListPrintSettingsComponent } from '../list-print-settings/list-print-settings.component';
import { PrintSettingService } from '../shared/services/printSetting-service.service';
import { NotificationService } from '@cad-core/services/notification.service';

@Component({
  selector: 'cad-unsuscribe-print-settings',
  templateUrl: './unsuscribe-print-settings.component.html',
  styleUrls: ['./unsuscribe-print-settings.component.scss'],
})
export class UnsuscribePrintSettingsComponent implements OnInit {
  printSettingId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ListPrintSettingModal: MatDialogRef<ListPrintSettingsComponent>,
    private _msgService: MessagingService,
    private _notification: NotificationService,
    private printSettingService: PrintSettingService
  ) { }

  ngOnInit(): void {
    this.printSettingId = this.data.Id;
  }

  unsuscribePrintSetting($event) {
    this.printSettingService.unSuscribePrintSettings($event).subscribe(
      res => {
        this._notification.showInfo('Se dio de baja la Configuración de Impresión', 'Configuración de Impresión Actualizado!');
        this.ListPrintSettingModal.close();
        this.printSettingService.filter('unsuscribe');
      },
      error => {
        this._notification.showWarning('La Configuración de Impresión no se dio de baja!', 'Configuración de Impresión no Actualizado');
      }
    )
  }
}
