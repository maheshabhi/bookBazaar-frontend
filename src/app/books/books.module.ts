import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BooksRoutingModule } from "./books.routing.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
// Import components
import { BooksComponent } from "./books.component";
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';

// Material modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { Bookservice } from './books.service';

 
@NgModule({
    imports: [
        CommonModule, FormsModule, BooksRoutingModule, HttpClientModule,
        MatCardModule, MatButtonModule
    ], 

    declarations: [
        BooksComponent, BooksListComponent, BookDetailComponent, BookCreateComponent,
    ], 
    providers: [Bookservice]
})


export class BooksModule {

}