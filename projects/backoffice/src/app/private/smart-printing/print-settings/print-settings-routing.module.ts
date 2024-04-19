import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPrintSettingsComponent } from './list-print-settings/list-print-settings.component';

const routes: Routes = [
  {
    path: '',
    component: ListPrintSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintSettingsRoutingModule {}
