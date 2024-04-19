import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UiComponentsModule } from '@sw-ui-components';

import sessionReducer, { sessionFeatureKey } from '@cad-core/store/reducers/session.reducer';
import { SessionEffects } from '@cad-core/store';

import { SharedModule } from '../shared';
import { LoginComponent } from './login/login.component';
import { PublicRoutingModule } from './public-routing.module';
import { PublicFooterComponent } from './layout/public-footer/public-footer.component';
import { PublicLayoutComponent } from './layout/public-layout.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
  declarations: [PublicFooterComponent, PublicLayoutComponent, LoginComponent],
  imports: [
    PublicRoutingModule,
    SharedModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    UiComponentsModule,
    MatTooltipModule,
    StoreModule.forFeature(sessionFeatureKey, sessionReducer),
    EffectsModule.forFeature([SessionEffects]),
  ],
  exports: [PublicLayoutComponent],
})
export class PublicModule {}
