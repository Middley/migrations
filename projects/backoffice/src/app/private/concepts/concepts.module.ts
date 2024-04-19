import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFamilyComponent } from './register-family/register-family.component';
import { UiComponentsModule } from '@sw-ui-components';
import { MatNativeDateModule } from '@angular/material/core';
import { ListFamiliesComponent } from './list-families/list-families.component';
import { ConceptsRoutingModule } from './concepts-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { StockConceptsByFamiliesService } from './shared/services/concepts.service';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';






@NgModule({
  declarations: [
    ListFamiliesComponent,
    RegisterFamilyComponent,

  ],
  providers: [
    StockConceptsByFamiliesService
  ],
  imports: [
    CommonModule,
    UiComponentsModule,
    MatNativeDateModule,
    ConceptsRoutingModule,
    MatIconModule,
    TranslateModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [ConceptsRoutingModule]
})
export class ConceptsModule { }
