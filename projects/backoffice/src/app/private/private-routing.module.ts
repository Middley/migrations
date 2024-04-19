import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateLayoutComponent } from './layout/private-layout.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'insumos',
        loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantModule),
      },
      {
        path: 'warehouse',
        loadChildren: () => import('./warehouse/warehouse.module').then(m => m.WarehouseModule),
      },
      {
        path: 'smartPrinting',
        loadChildren: () => import('./smart-printing/smart-printing.module').then(m => m.SmartPrintingModule),
      },
      {
        path: 'preSale',
        loadChildren: () => import('./presale/presale.module').then(m => m.PresaleModule)
      },
      {
        path: 'concepts',
        loadChildren: () => import('./concepts/concepts.module').then(m => m.ConceptsModule)
      },
      {
        path: 'generic',
        loadChildren: () => import('./generic-component/generic-component.module').then(m => m.GenericComponentModule)
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule { }
