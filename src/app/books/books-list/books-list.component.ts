import { Component, OnInit } from '@angular/core';
import { Bookservice } from '../books.service';
import { Book } from '../book';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from "../../dialog/confirmDialog.component"; 
@Component({
    selector: 'app-books-list',
    templateUrl: './books-list.component.html',
    styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

    books: Book;
    userName: string;

    constructor(private _bookService: Bookservice,
                private _router: Router,
                private _dialog: MatDialog) { }

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

    addBook() {
        this.userName = localStorage.getItem('userName');

        if(!this.userName) {
            this.openAlertDialog();
        } else {
            this._router.navigate(['/book/add']);
        }
    }


    openAlertDialog() {
        const dialogRef = this._dialog.open(ConfirmDialogComponent, {
            data: {
                message: 'You should log in to perform this action', 
                buttonText: {
                    ok: 'Ok',
                    cancel: 'Cancel'
                }
            }
        });
    
        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if(confirmed) {
                this._router.navigate(['/login']);
            }
        })
    }
}
