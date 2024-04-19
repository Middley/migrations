import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'print-settings',
    loadChildren: () => import('./print-settings/print-settings.module').then(p => p.PrintSettingsModule),
  },
  {
    path: 'serviceCenter-and-categories',
    loadChildren: () => import('./service-center-and-categories/service-center-and-categories.module').then(p => p.ServiceCenterAndCategoriesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmartPrintingRoutingModule { }
