import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BooksModule } from './books/books.module';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from "@angular/material/toolbar";

import { MatIconModule } from "@angular/material/icon"; 

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, 
        BooksModule, AppRoutingModule, MatIconModule, MatToolbarModule
    ],
    providers: [
        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
