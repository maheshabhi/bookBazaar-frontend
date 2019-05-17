import { IBook } from '../../book';

export interface IBookstate {
    books: IBook[], 
    selectedBook: IBook
}


export const initialBookState:  IBookstate =  {
    books: null, 
    selectedBook: null
}
