import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthorRoutingModule } from './author-routing.module';
import { AuthorLoginComponent } from './author-login/author-login.component';


import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthorService } from "./author.servcie";

@NgModule({
    declarations: [AuthorLoginComponent],
    imports: [
        CommonModule, ReactiveFormsModule, FormsModule, AuthorRoutingModule, 
        MatButtonModule, MatInputModule, MatFormFieldModule
    ], 
    providers: [AuthorService]
})

export class AuthorModule { }
