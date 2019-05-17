import { EBookActions, BookActions } from "../actions/book.action";
import { initialBookState, IBookstate } from "../state/book.state";

export const bookReducers = (
    state =  initialBookState, 
    action: BookActions): IBookstate => {

        switch(action.type) {
            case EBookActions.GetBooksSuccess: {
                return {
                    ...state, 
                    books: action.payload
                };
            }

            case EBookActions.GetBookSuccess: {
                return {
                    ...state, 
                    selectedBook: action.payload
                };
            }

            default :
                return state;
        }
    };