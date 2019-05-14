import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";
import { Bookservice } from "../books.service";

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

    id: any;
    constructor(private _route: Router, 
                private _activatedRoute:ActivatedRoute,
                private _booKservice: Bookservice) { 
        this.id = this._activatedRoute.snapshot.params.get('id');
        // this.bookId = this._activatedRoute.paramMap.pipe(
        //     switchMap((params: paramMap) => {
        //         this.
        //     })
        // )
    }

    ngOnInit() {
        this.getBookDetail();
    }

    getBookDetail() {
        this._booKservice.getBookById(this.id).subscribe(
            data => {
                console.log("Book", data);
            }, err => {
                console.log("Error", err);
            }
        );
    }

}
