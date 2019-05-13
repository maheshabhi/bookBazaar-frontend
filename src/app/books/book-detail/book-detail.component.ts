import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";
import { Bookservice } from "../books.service";
import { Book } from '../book';
import { Location } from "@angular/common";

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

    book: Book;

    id: any;
    constructor(private _route: Router, 
                private _activatedRoute:ActivatedRoute,
                private _booKservice: Bookservice,
                private _location: Location) { 
            
            this.id = this._activatedRoute.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.getBookDetailsById();
    }

    getBookDetailsById() {
        this._booKservice.getBookById(this.id).subscribe(
            data => {
                console.log("Book details", data);
                this.book = data[0].data;
            }, error => {
                console.log("Error occured while fetching book details", error);
            }
        );
    }

    goBack() {
        this._location.back();
    }



}
