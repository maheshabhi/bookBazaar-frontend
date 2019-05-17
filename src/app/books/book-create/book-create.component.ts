import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Bookservice } from '../books.service';
import { HttpHeaders } from "@angular/common/http";

@Component({
    selector: 'app-book-create',
    templateUrl: './book-create.component.html',
    styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

    bookForm: FormGroup;

    constructor(private _fb: FormBuilder,
                private _bookService: Bookservice) {
        this.bookForm = this._fb.group({
            title: ['', Validators.required], 
            author: ['', Validators.required], 
            description: [''], 
            publisher: ['', Validators.required], 
            publishedYear: ['']
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        // console.log("data", this.bookForm.value);
        let data = JSON.stringify(this.bookForm.value);
        console.log("Data", data);
        let headers = new HttpHeaders();
        headers = headers.append('content-type', 'application/json');
        this._bookService.addBook(this.bookForm.value, headers).subscribe(
            data => {
                console.log("Book added successfully!");
            }, error => {
                console.log("Error occured while adding a book", error);
            }
        );
    }

}
