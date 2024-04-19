import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import { PrintSettingService } from '../shared/services/printSetting-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { CustomTitleService } from '@cad-shared/services/custom-title.service';
import { NotificationService } from '@cad-core/services/notification.service';

@Component({
  selector: 'cad-register-print-settings',
  templateUrl: './register-print-settings.component.html',
  styleUrls: ['./register-print-settings.component.scss'],
})
export class RegisterPrintSettingsComponent implements OnInit {
  form: FormGroup;

  establishments: any[];
  serviceCenters: any[];
  printableDocuments: any[];
  printers: any[];

  constructor(
    private _fb: FormBuilder,
    private _translate: TranslateService,
    private dateAdapter: DateAdapter<Date>,
    private registerPrintSettingModal: MatDialogRef<RegisterPrintSettingsComponent>,
    private printSettingService: PrintSettingService,
    private _msgService: MessagingService,
    private customTitle: CustomTitleService,
    private _notification: NotificationService,
  ) {
    this.dateAdapter.setLocale('es-CL');
  }

  ngOnInit(): void {
    this.reactiveForm();
    this.getSettings();
  }

  reactiveForm() {
    this.form = this._fb.group({
      establishment: new FormControl('', [Validators.required]),
      serviceCenter: new FormControl('', [Validators.required]),
      printableDocument: new FormControl('', [Validators.required]),
      printer: new FormControl('', [Validators.required]),
    });
    this.form.controls.serviceCenter.disable();
    this.form.controls.printableDocument.disable();
    this.form.controls.printer.disable();
  }

  getSettings() {
    this.printSettingService.getAllSettings().subscribe(res => {
      this.establishments = res.establisments;
    });
  }

  selectedEstablishment(event) {
    this.printSettingService.getByEstaBlishment(event).subscribe(res => {
      this.form.controls.serviceCenter.enable();
      this.form.controls.printableDocument.enable();
      this.form.controls.printer.enable();
      this.printableDocuments = res.data.printableDocuments;
      this.serviceCenters = res.data.serviceCenters;
      this.printers = res.data.printers;
    });
  }

  setDefaultValueMasters(nameControl: string, masterDetails: any[], searchValue: string) {
    const toSelect = masterDetails.find(c => c.name == searchValue);
    this.form.get(nameControl).setValue(toSelect.id);
  }
  save() {
    const PrintSetting = {
      idCentroAtencion: this.form.value.serviceCenter,
      idDocumentoImprimible: this.form.value.printableDocument,
      idImpresora: this.form.value.printer,
    };
    this.printSettingService.add(PrintSetting).subscribe(
      res => {
        this._notification.showInfo('Se agrego correctamente la Configuración de Impresión', 'Configuración de Impresión Registrado!');
        this.registerPrintSettingModal.close();
        this.printSettingService.filter('Registered!');
      },
      error => {
        this._notification.showWarning('La Configuración de Impresión no se pudo registrar!', 'Configuración de Impresión no Registrado');
      }
    );
  }
}
