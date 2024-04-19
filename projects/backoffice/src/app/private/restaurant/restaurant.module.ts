import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterInsumoComponent } from './insumos/register-insumo/register-insumo.component';
import { RegisterItemComponent } from './insumos/register-item/register-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { UiComponentsModule } from '@sw-ui-components';
import { SharedModule } from '@cad-shared/shared.module';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { UnsuscribeInsumoComponent } from './insumos/unsuscribe-insumo/unsuscribe-insumo.component';
import { ProductionEstimateComponent } from './insumos/production-estimate/production-estimate.component';
import { MatSelectModule } from '@angular/material/select';
import { InventoryInsumoComponent } from './insumos/inventory-insumo/inventory-insumo.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';




@NgModule({
  declarations: [RegisterInsumoComponent, RegisterItemComponent, UnsuscribeInsumoComponent, ProductionEstimateComponent, InventoryInsumoComponent],
  imports: [
    CommonModule,
    DragDropModule,
    MatCardModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    UiComponentsModule,
    SharedModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    RestaurantRoutingModule
  ]
})
export class RestaurantModule { }
