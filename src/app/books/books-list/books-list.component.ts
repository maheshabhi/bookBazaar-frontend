import { Component, OnInit } from '@angular/core';
import { Bookservice } from '../books.service';
import { Book } from '../book';

@Component({
    selector: 'app-books-list',
    templateUrl: './books-list.component.html',
    styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

    books: Book;

    constructor(private _bookService: Bookservice) { }

    ngOnInit() {
        this.getBooks();
    }

    getBooks() {
        this._bookService.getBooks().subscribe(
            (data: Book) => {
                console.log("Books", data);
                this.books = data;
            }, error => {
                console.log("Error", error);
            }
        )
    }



}
