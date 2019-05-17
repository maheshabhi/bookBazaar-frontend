import { RouterReducerState } from '@ngrx/router-store';
import { IBookstate, initialBookState } from './book.state';
import { IBook } from '../../book';


export interface IAppState {
    router?: RouterReducerState, 
    books: IBookstate
}

export const initialAppState: IAppState = {
    books: initialBookState
}

export function getInitialState(): IAppState {
    return initialAppState;
}