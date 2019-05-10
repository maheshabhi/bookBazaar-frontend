import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";
import {  } from ".";
@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

    constructor(private _route: Router, 
                private _activatedRoute:ActivatedRoute,
                private _booKservice: BooKservice) { 
        this.bookId = this._activatedRoute.paramMap.pipe(
            switchMap((params: paramMap) => {
                this.
            })
        )
    }

    ngOnInit() {
    }



}
