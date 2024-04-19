import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociationServiceCenterAndCategoriesComponent } from './association-service-center-and-categories/AssociationServiceCenterAndCategoriesComponent';

const routes: Routes = [
    {
        path: '',
        component: AssociationServiceCenterAndCategoriesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ServiceCenterAndCategoriesRoutingModule { }