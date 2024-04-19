import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@cad-shared/shared.module';
import { SmartPrintingRoutingModule } from './smart-printing-routing.module';
import { PrivateModule } from '..';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule,],
  exports: [SmartPrintingRoutingModule],
})
export class SmartPrintingModule { }
