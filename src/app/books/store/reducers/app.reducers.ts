import { ActionReducerMap } from "@ngrx/store";
import { routerReducer } from "@ngrx/router-store";

import { IAppState } from "../state/app.state";
import { bookReducers } from "../reducers/book.reducers";

export const appReducers: ActionReducerMap<IAppState, any> =  {
    router: routerReducer, 
    books: bookReducers
};