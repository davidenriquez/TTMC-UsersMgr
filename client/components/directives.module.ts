import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapseModule } from 'ngx-bootstrap';


import { RouterModule } from '@angular/router';


import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { UserFormComponent } from './userForm/userForm.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './pageNotFound.component';


@NgModule({
    imports: [
        CommonModule,
        CollapseModule,
        FormsModule,
        RouterModule,
    ],  
    declarations: [
        NavbarComponent,
        FooterComponent,
        UserFormComponent,
        PageNotFoundComponent

    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        UserFormComponent,
    ]
})
export class DirectivesModule {}
