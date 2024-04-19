import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@cad-shared/shared.module';

import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { GenericComponentRoutingModule } from './generic-component-routing.module';
import { RegisterInvoicingComponent } from './register-invoicing/register-invoicing.component';
import { ModalAlertComponent } from './modal-alert/modal-alert.component';



@NgModule({
  declarations: [
    RegisterInvoicingComponent,
    ModalAlertComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  exports: [GenericComponentRoutingModule, RegisterInvoicingComponent]
})
export class GenericComponentModule { }
