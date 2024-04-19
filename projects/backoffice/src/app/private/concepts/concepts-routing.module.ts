import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFamiliesComponent } from './list-families/list-families.component';
import { RegisterFamilyComponent } from './register-family/register-family.component';


const routes: Routes = [
    {
        path: '',
        component: ListFamiliesComponent,
        data: {
            scrollDisabled: true,
            toolbarShadowEnabled: true
        }
    },
    {
        path: 'list-families',
        component: ListFamiliesComponent,
        data: {
            scrollDisabled: true,
            toolbarShadowEnabled: true
        }
    },
    {
        path: 'register-family',
        component: RegisterFamilyComponent,
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
export class ConceptsRoutingModule { }