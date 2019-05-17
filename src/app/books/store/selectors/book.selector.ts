import { createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { IBookstate } from "../state/book.state";

const selectBooks = (state: IAppState) => state.books;

export const selectBookList = createSelector(
    selectBooks, 
    (state: IBookstate) => state.books
);

export const selectSelectedBook = createSelector(
    selectBooks, 
    (state: IBookstate) => state.selectedBook
)