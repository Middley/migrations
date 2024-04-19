import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import { PrintSettingService } from '../shared/services/printSetting-service.service';
import { NotificationService } from '@cad-core/services/notification.service';

@Component({
  selector: 'cad-edit-print-settings',
  templateUrl: './edit-print-settings.component.html',
  styleUrls: ['./edit-print-settings.component.scss'],
})
export class EditPrintSettingsComponent {
  form: FormGroup;

  establishments: any[];
  serviceCenters: any[];
  printableDocuments: any[];
  printers: any[];
  printSetting: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _notification: NotificationService, private editPrintSettingModal: MatDialogRef<EditPrintSettingsComponent>, private _fb: FormBuilder, private printSettingService: PrintSettingService, private _translate: TranslateService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('es-CL');
    this.getById();
  }

  getById() {
    this.printSettingService.getById(this.data.Id).subscribe(res => {
      this.printSetting = res.data;
    })
  }
  ngOnInit(): void {

    this.reactiveForm();
    this.getSettings();

  }

  getSettings() {
    this.printSettingService.getAllSettings().subscribe(res => {
      this.establishments = res.establisments;
      this.setDefaultValueMasters('establishment', this.establishments, this.establishments[0].name);
      this.selectedFirshtEstablishment(this.form.value.establishment);
    });
  }

  selectedFirshtEstablishment(event) {
    this.printSettingService.getByEstaBlishment(event).subscribe(res => {
      this.form.controls.serviceCenter.enable();
      this.form.controls.printableDocument.enable();
      this.form.controls.printer.enable();
      this.printableDocuments = res.data.printableDocuments;
      this.serviceCenters = res.data.serviceCenters;
      this.printers = res.data.printers;
      this.setDefaultValueIdMasters('serviceCenter', this.serviceCenters, this.printSetting.idCentroAtencion);
      this.setDefaultValueIdMasters('printableDocument', this.printableDocuments, this.printSetting.idDocumentoImprimible);
      this.setDefaultValueIdMasters('printer', this.printers, this.printSetting.idImpresora);
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


  setDefaultValueMasters(nameControl: string, masterDetails: any[], searchValue: string) {
    const toSelect = masterDetails.find(c => c.name == searchValue);
    this.form.get(nameControl).setValue(toSelect.id);
  }

  setDefaultValueIdMasters(nameControl: string, masterDetails: any[], searchId: number) {
    console.log("nameControl", nameControl)
    console.log("masterDetails", masterDetails)
    console.log("searchId", searchId)
    const toSelect = masterDetails.find(c => c.id == searchId);
    console.log("toSelect", toSelect)
    this.form.get(nameControl).setValue(toSelect.id);
  }
  save() {
    const PrintSetting = {
      id: this.data.Id,
      idCentroAtencion: this.form.value.serviceCenter,
      idDocumentoImprimible: this.form.value.printableDocument,
      idImpresora: this.form.value.printer,
    };
    this.printSettingService.update(PrintSetting).subscribe(
      res => {
        this._notification.showInfo('Se actualizo correctamente la Configuración de Impresión', 'Configuración de Impresión actualizado!');
        this.editPrintSettingModal.close();
        this.printSettingService.filter('Registered!');
      },
      error => {
        this._notification.showWarning('La Configuración de Impresión no se pudo actualizar!', 'Configuración de Impresión no actualizado');
      }
    );
  }
}
