import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPresaleComponent } from './list-presale/list-presale.component';
import { ShowPresaleComponent } from './show-presale/show-presale.component';
import { RegisterPresaleComponent } from './register-presale/register-presale.component';
import { FinishPresaleComponent } from './finish-presale/finish-presale.component';
import { ReportFiltersComponent } from './report-filters/report-filters.component';
import { ReportByConceptComponent } from './report-by-concept/report-by-concept.component';
import { ReportByAdvancePaymentComponent } from './report-by-advance-payment/report-by-advance-payment.component';
import { ReportByBasicConceptComponent } from './report-by-basic-concept/report-by-basic-concept.component';
import { ReportByPaymentMethodsComponent } from './report-by-payment-methods/report-by-payment-methods.component';
import { ReportSaleByPresaleComponent } from './report-sale-by-presale/report-sale-by-presale.component';
import { EditPresaleComponent } from './edit-presale/edit-presale.component';

const routes: Routes = [
    {
        path: '',
        component: ListPresaleComponent,
        data: {
            scrollDisabled: true,
            toolbarShadowEnabled: true
        }
    },
    {
        path: 'show-pre-sale',
        component: ShowPresaleComponent,
        data: {
            scrollDisabled: true,
            toolbarShadowEnabled: true
        }
    },
    {
        path: 'register-pre-sale',
        component: RegisterPresaleComponent,
        data: {
            scrollDisabled: true,
            toolbarShadowEnabled: true
        }
    },
    {
        path: 'report-pre-sale',
        component: ReportFiltersComponent,
        data: {
            scrollDisabled: true,
            toolbarShadowEnabled: true
        }
    },
    {
        path: 'finish-pre-sale/:presaleId',
        component: FinishPresaleComponent,
        data: {
            scrollDisabled: true,
            toolbarShadowEnabled: true
        }
    },
    {
        path: 'report-by-concept',
        component: ReportByConceptComponent,
        data: {
            scrollDisabled: true,
            toolbarShadowEnabled: true
        }
    },
    {
        path: 'report-by-advance-payment',
        component: ReportByAdvancePaymentComponent,
        data: {
            scrollDisabled: true,
            toolbarShadowEnabled: true
        }
    },
    {
        path: 'report-by-basic-concept',
        component: ReportByBasicConceptComponent,
        data: {
            scrollDisabled: true,
            toolbarShadowEnabled: true
        }
    },
    {
        path: 'report-by-payment-methods',
        component: ReportByPaymentMethodsComponent,
        data: {
            scrollDisabled: true,
            toolbarShadowEnabled: true
        }
    },
    {
        path: 'report-sale-by-presale',
        component: ReportSaleByPresaleComponent,
        data: {
            scrollDisabled: true,
            toolbarShadowEnabled: true
        }
    },
    {
        path: 'edit-presale',
        component: EditPresaleComponent,
        data: {
            scrollDisabled: true,
            toolbarShadowEnabled: true
        }
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PresaleRoutingModule { }
