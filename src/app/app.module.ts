import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BooksModule } from './books/books.module';
import { AuthorModule } from "./author/author.module";
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from "@angular/material/toolbar";

import { MatIconModule } from "@angular/material/icon"; 
import { ConfirmDialogComponent } from "./dialog/confirmDialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        AppComponent,PageNotFoundComponent, HeaderComponent, 
        ConfirmDialogComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, BooksModule, AuthorModule, AppRoutingModule, 
        MatIconModule, MatToolbarModule, MatDialogModule, MatButtonModule
    ],
    providers: [],
    entryComponents: [ ConfirmDialogComponent ],
    bootstrap: [AppComponent]
})
export class AppModule { }
