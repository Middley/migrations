import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterInsumoComponent } from './insumos/register-insumo/register-insumo.component';
import { ProductionEstimateComponent } from './insumos/production-estimate/production-estimate.component';
import { InventoryInsumoComponent } from './insumos/inventory-insumo/inventory-insumo.component';


const routes: Routes = [
  {
    path: '',
    component: RegisterInsumoComponent,
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: true
    }
  },
  {
    path: 'production-estimate',
    component: ProductionEstimateComponent,
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: true
    }
  },
  {
    path: 'inventory-insumo',
    component: InventoryInsumoComponent,
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
export class RestaurantRoutingModule { }
