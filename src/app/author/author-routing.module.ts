import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorLoginComponent } from './author-login/author-login.component';

const routes: Routes = [
    { path: 'login', component: AuthorLoginComponent }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthorRoutingModule { }
