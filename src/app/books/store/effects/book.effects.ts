import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { IBookHttp } from "../../../models/http-models/book-http.interface";
import { IAppState } from "../state/app.state";

import { GetBook, GetBookSuccess, GetBooks, GetBooksSuccess, EBookActions } from "../actions/book.action";
import { Bookservice } from "../../books.service";


@Injectable()

export class BookEffect {

    constructor(private _actions$: Actions, 
                private _bookService:Bookservice, 
                private _store: Store<IAppState> ) {}

    // @Effect()
    // getBooks$ = this._actions$.pipe(
    //     ofType<GetBooks>(EBookActions.GetBooks),
    //     switchMap(() => this._bookService.getBooks()),
    //     switchMap((bookHttp: IBookHttp) => of(new GetBooksSuccess(bookHttp.books)))
    // )

    @Effect()
    getBooks$ = this._actions$.pipe(
        ofType<GetBooks>(EBookActions.GetBooks),
        switchMap(() => this._bookService.getBooks()),
        switchMap((userHttp: IBookHttp) => of(new GetBooksSuccess(userHttp.users)))
    );
            
}