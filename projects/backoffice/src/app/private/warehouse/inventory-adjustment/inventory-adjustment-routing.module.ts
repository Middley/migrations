import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInventoryAdjustmentComponent } from './list-inventory-adjustment/list-inventory-adjustment.component';

const routes: Routes = [
  {
    path: '',
    component: ListInventoryAdjustmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryAdjustmentRoutingModule {}
