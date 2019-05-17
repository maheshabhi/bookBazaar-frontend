import { Action } from '@ngrx/store';

import { IBook } from '../../book';
import { read } from 'fs';

export enum EBookActions {
    GetBooks = '[Book] Get Books', 
    GetBooksSuccess = '[Book] Get Books Success', 
    GetBook = '[Book] Get Book',
    GetBookSuccess = '[Book] Get Book Success' 
}

export class GetBooks implements Action {
    public readonly type = EBookActions.GetBooks; 
}

export class GetBooksSuccess implements Action {
    public readonly type = EBookActions.GetBooksSuccess;
    constructor(public payload: number) {}
}

export class GetBook implements Action {
    public readonly type = EBookActions.GetBook;
}


export class GetBookSuccess implements Action {
    public readonly type = EBookActions.GetBookSuccess;
    constructor(public payload: number) {}
}

export type BookActions = GetBooks | GetBooksSuccess | GetBook | GetBookSuccess;
