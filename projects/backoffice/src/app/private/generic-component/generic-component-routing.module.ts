import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterInvoicingComponent } from './register-invoicing/register-invoicing.component';

const routes: Routes = [
    {
        path: 'register-invoicing',
        component: RegisterInvoicingComponent,
        data: {
            scrollDisabled: true,
            toolbarShadowEnabled: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GenericComponentRoutingModule { }
