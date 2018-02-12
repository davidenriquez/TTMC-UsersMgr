import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { RouterModule, Routes } from '@angular/router';

import { TooltipModule } from 'ngx-bootstrap';

import { MainComponent } from './main.component';
import { UserFormComponent } from '../../components/userForm/userForm.component';
import { PageNotFoundComponent } from '../../components/pageNotFound.component';


export const ROUTES: Routes = [
    { path: '', component: MainComponent },
    { path: 'home', component: MainComponent },
    { path: 'userForm/:id', component: UserFormComponent },
    { path: 'userForm', component: UserFormComponent },
    { path: '**', component : PageNotFoundComponent }

];


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(ROUTES),


        TooltipModule.forRoot(),
    ],
    declarations: [
        MainComponent,
    ],

    exports: [
        MainComponent,
    ],
})
export class MainModule {}
