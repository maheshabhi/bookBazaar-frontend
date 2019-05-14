import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BooksRoutingModule } from "./books.routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// Import components
import { BooksComponent } from "./books.component";
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';

// Material modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule  } from "@angular/material/core";

// Importing the service
import { Bookservice } from './books.service';
import { AuthInterceptor } from "../auth.interceptor";


@NgModule({
    imports: [
        CommonModule, FormsModule,ReactiveFormsModule, BooksRoutingModule, HttpClientModule,
        MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
        MatNativeDateModule
    ], 

    declarations: [
        BooksComponent, BooksListComponent, BookDetailComponent, BookCreateComponent,
    ], 
    providers: [Bookservice, MatDatepickerModule
    ]
})


export class BooksModule {

}