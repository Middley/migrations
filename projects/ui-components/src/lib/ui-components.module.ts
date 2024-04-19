import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimengModule } from './primeng.module';
import { SwButtonComponent } from './button/sw-button.component';
import { SwPageHeadComponent } from './page-head/sw-page-head.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TableFilterComponent } from './table-filter/table-filter.component';

import { MatIconModule } from '@angular/material/icon';
import { DisplaySpinnerComponent } from './display-spinner/display-spinner.component';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { ChipsInputComponent } from './chips-input/chips-input.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchByCriterionComponent } from './search-by-criterion/search-by-criterion.component';
import { UnsuscribeDialogComponent } from './unsuscribe-dialog/unsuscribe-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CommercialActorSelectorComponent } from './commercial-actor-selector/commercial-actor-selector.component';
import { ElectronicReceiptSelectorComponent } from './electronic-receipt-selector/electronic-receipt-selector.component';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { RegisterConceptComponent } from './register-concept/register-concept.component';
import { ConceptDetailComponent } from './concept-detail/concept-detail.component';
import { MultipayRegisterComponent } from './multipay-register/multipay-register.component';
import { PaymentMethodSelectorComponent } from './payment-method-selector/payment-method-selector.component';
import { PaymentTraceEditorComponent } from './payment-trace-editor/payment-trace-editor.component';
import { MultipayResumeComponent } from './multipay-resume/multipay-resume.component';

import { MatTableModule } from '@angular/material/table';
import { RegisterDataInvoicingComponent } from './register-data-invoicing/register-data-invoicing.component';
import { AsynchronousSelectorComponent } from './asynchronous-selector/asynchronous-selector.component';
import { ConceptDetailResumeComponent } from './concept-detail-resume/concept-detail-resume.component';
import { ComprobantViewerComponent } from './comprobant-viewer/comprobant-viewer.component';
import { ConfirmActionModalComponent } from './confirm-action-modal/confirm-action-modal.component';
import { OperationViwerComponent } from './operation-viwer/operation-viwer.component';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableByGroupComponent } from './table-by-group/table-by-group.component';
import { TableSummaryAndDetailComponent } from './table-summary-and-detail/table-summary-and-detail.component';
import { TableDetailComponent } from './table-detail/table-detail.component';
import { TableConfirmInvalidDetailComponent } from './table-confirm-invalid-detail/table-confirm-invalid-detail.component';
import { InformativeDialogComponent } from './informative-dialog/informative-dialog.component';


@NgModule({
  declarations: [
    SwButtonComponent,
    SwPageHeadComponent,
    ConfirmationDialogComponent,
    DisplaySpinnerComponent,
    HeaderTitleComponent,
    TableFilterComponent,
    ChipsInputComponent,
    SearchByCriterionComponent,
    UnsuscribeDialogComponent,
    ConfirmDialogComponent,
    CommercialActorSelectorComponent,
    ElectronicReceiptSelectorComponent,
    RegisterConceptComponent,
    ConceptDetailComponent,
    MultipayRegisterComponent,
    PaymentMethodSelectorComponent,
    PaymentTraceEditorComponent,
    MultipayResumeComponent,
    RegisterDataInvoicingComponent,
    AsynchronousSelectorComponent,
    ConceptDetailResumeComponent,
    ComprobantViewerComponent,
    ConfirmActionModalComponent,
    OperationViwerComponent,
    ReportViewerComponent,
    TableByGroupComponent,
    TableSummaryAndDetailComponent,
    TableDetailComponent,
    TableConfirmInvalidDetailComponent,
    InformativeDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    FormsModule,
    PrimengModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    SwButtonComponent,
    SwPageHeadComponent,
    ConfirmationDialogComponent,
    TableFilterComponent,
    DisplaySpinnerComponent,
    HeaderTitleComponent,
    ChipsInputComponent,
    SearchByCriterionComponent,
    UnsuscribeDialogComponent,
    CommercialActorSelectorComponent,
    ElectronicReceiptSelectorComponent,
    RegisterConceptComponent,
    ConceptDetailComponent,
    MultipayRegisterComponent,
    PaymentMethodSelectorComponent,
    MultipayResumeComponent,
    RegisterDataInvoicingComponent,
    AsynchronousSelectorComponent,
    ConceptDetailResumeComponent,
    ComprobantViewerComponent,
    ConfirmActionModalComponent,
    OperationViwerComponent,
    ReportViewerComponent,
    InformativeDialogComponent
  ],
})
export class UiComponentsModule { }
