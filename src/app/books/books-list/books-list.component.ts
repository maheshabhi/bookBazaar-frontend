import { Component, OnInit } from '@angular/core';
import { Bookservice } from '../books.service';
import { IBook } from '../book';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from "@ngrx/store";
import { IAppState } from "../store/state/app.state";
import { selectBookList } from '../store/selectors/book.selector';
import { GetBooks } from "../store/actions/book.action";
import { ConfirmDialogComponent } from "../../dialog/confirmDialog.component"; 

@Component({
    selector: 'app-books-list',
    templateUrl: './books-list.component.html',
    styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

    books$ = this._store.pipe(select(selectBookList));
    userName: string;

    constructor(private _bookService: Bookservice,
                private _router: Router,
                private _dialog: MatDialog,
                private _store: Store<IAppState>) { }
    

    ngOnInit() {
        // this.getBooks();
        this._store.dispatch(new GetBooks());
    }

    // getBooks() {
    //     this._bookService.getBooks().subscribe(
    //         (data: IBook) => {
    //             console.log("Books", data);
    //             this.books = data;
    //         }, error => {
    //             console.log("Error", error);
    //         }
    //     )
    // }

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
