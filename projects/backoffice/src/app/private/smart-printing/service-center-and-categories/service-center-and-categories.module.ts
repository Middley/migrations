import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@cad-shared/shared.module';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTreeModule } from '@angular/material/tree';
import { AssociationServiceCenterAndCategoriesComponent } from './association-service-center-and-categories/AssociationServiceCenterAndCategoriesComponent';
import { ServiceCenterAndCategoriesRoutingModule } from './service-center-and-categories-routing.module'
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AssociationServiceCenterAndCategoriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    DragDropModule,
    MatTreeModule,
    MatCheckboxModule
  ], exports: [ServiceCenterAndCategoriesRoutingModule]
})
export class ServiceCenterAndCategoriesModule { }
