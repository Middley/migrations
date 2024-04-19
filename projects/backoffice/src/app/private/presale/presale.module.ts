import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPresaleComponent } from './list-presale/list-presale.component';
import { SharedModule } from '@cad-shared/shared.module';
import { RegisterPresaleComponent } from './register-presale/register-presale.component';
import { ShowPresaleComponent } from './show-presale/show-presale.component';
import { PresaleRoutingModule } from './presale-routing.module';
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
import { GenericComponentModule } from '@cad-private/generic-component/generic-component.module';
import { RegisterAdvancePaymentComponent } from './register-advance-payment/register-advance-payment.component';
import { ConfirmPresaleComponent } from './confirm-presale/confirm-presale.component';
import { FinishPresaleComponent } from './finish-presale/finish-presale.component';
import { ReportFiltersComponent } from './report-filters/report-filters.component';
import { MatRadioModule } from '@angular/material/radio';
import { ReportByConceptComponent } from './report-by-concept/report-by-concept.component';
import { ReportByAdvancePaymentComponent } from './report-by-advance-payment/report-by-advance-payment.component';
import { ReportByBasicConceptComponent } from './report-by-basic-concept/report-by-basic-concept.component';
import { ReportByPaymentMethodsComponent } from './report-by-payment-methods/report-by-payment-methods.component';
import { ReportSaleByPresaleComponent } from './report-sale-by-presale/report-sale-by-presale.component';
import { EditPresaleComponent } from './edit-presale/edit-presale.component';
import { InvalidatePresaleComponent } from './invalidate-presale/invalidate-presale.component';



@NgModule({
  declarations: [
    ListPresaleComponent,
    RegisterPresaleComponent,
    ShowPresaleComponent,
    RegisterAdvancePaymentComponent,
    ConfirmPresaleComponent,
    FinishPresaleComponent,
    ReportFiltersComponent,
    ReportByConceptComponent,
    ReportByAdvancePaymentComponent,
    ReportByBasicConceptComponent,
    ReportByPaymentMethodsComponent,
    ReportSaleByPresaleComponent,
    EditPresaleComponent,
    InvalidatePresaleComponent,
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
    MatDividerModule,
    GenericComponentModule,
    MatRadioModule
  ],
  exports: [PresaleRoutingModule]
})
export class PresaleModule { }
