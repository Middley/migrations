import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inventory-adjustment',
    loadChildren: () => import('./inventory-adjustment/inventory-adjustment.module').then(p => p.InventoryAdjustmentModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WareHouseRoutingModule {}
