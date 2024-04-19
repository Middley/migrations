import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntityDataService, EntityDefinitionService, PLURAL_NAMES_TOKEN } from '@ngrx/data';

import { UiComponentsModule } from '@sw-ui-components';

import { SharedModule } from '@cad-shared/shared.module';
import { PrivateRoutingModule } from '@cad-private/private-routing.module';

import { HomeComponent } from './home/home.component';
import { FooterPrivateComponent, HeaderPrivateComponent, PrivateLayoutComponent } from './layout';

import { SidebarPrivateComponent } from './layout/sidebar/sidebar-private.component';
import { SpinnerComponent } from '../shared/spinner.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    PrivateLayoutComponent,
    HomeComponent,
    HeaderPrivateComponent,
    FooterPrivateComponent,
    SidebarPrivateComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatSidenavModule,
    MatToolbarModule,
    UiComponentsModule,
    SharedModule,
    MatTreeModule,
    ModalModule.forRoot()
  ],
  exports: [PrivateLayoutComponent],

})
export class PrivateModule { }
