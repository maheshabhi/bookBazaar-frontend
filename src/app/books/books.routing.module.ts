import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';

const bookRoutes: Routes = [
    { path: '', redirectTo: '/books', pathMatch: 'full' },
    { path: 'books', component: BooksListComponent }, 
    { path: 'books/:id', component: BookDetailComponent }, 
    { path: 'book/addBook', component: BookCreateComponent }
]

@NgModule({
    imports: [RouterModule.forChild(bookRoutes)], 
    exports: [RouterModule]
})

export class BooksRoutingModule {
 
}