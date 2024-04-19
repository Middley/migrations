import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@cad-shared/shared.module';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ListPrintSettingsComponent } from './list-print-settings/list-print-settings.component';
import { PrintSettingsRoutingModule } from './print-settings-routing.module';
import { RegisterPrintSettingsComponent } from './register-print-settings/register-print-settings.component';
import { ShowPrintSettingsComponent } from './show-print-settings/show-print-settings.component';
import { EditPrintSettingsComponent } from './edit-print-settings/edit-print-settings.component';
import { UnsuscribePrintSettingsComponent } from './unsuscribe-print-settings/unsuscribe-print-settings.component';

@NgModule({
  declarations: [ListPrintSettingsComponent, RegisterPrintSettingsComponent, ShowPrintSettingsComponent, EditPrintSettingsComponent, UnsuscribePrintSettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [PrintSettingsRoutingModule],
})
export class PrintSettingsModule {}
