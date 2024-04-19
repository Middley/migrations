import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryAdjustmentRoutingModule } from './inventory-adjustment-routing.module';
import { SharedModule } from '@cad-shared/shared.module';

import { ListInventoryAdjustmentComponent } from './list-inventory-adjustment/list-inventory-adjustment.component';
import { RegisterInventoryAdjustmentComponent } from './register-inventory-adjustment/register-inventory-adjustment.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { ComplementRegisterInventoryAdjustmentComponent } from './complement-register-inventory-adjustment/complement-register-inventory-adjustment.component';
import { ModalService } from './shared/services/modal.service';
import { ShowInventoryAdjustmentComponent } from './show-inventory-adjustment/show-inventory-adjustment.component';
import { EditInventoryAdjustmentComponent } from './edit-inventory-adjustment/edit-inventory-adjustment.component';

@NgModule({
  declarations: [ListInventoryAdjustmentComponent, RegisterInventoryAdjustmentComponent, ShowInventoryAdjustmentComponent, ComplementRegisterInventoryAdjustmentComponent, EditInventoryAdjustmentComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports: [InventoryAdjustmentRoutingModule],
  providers: [
    ModalService, // Agrega el servicio como proveedor
  ]
})
export class InventoryAdjustmentModule { }
