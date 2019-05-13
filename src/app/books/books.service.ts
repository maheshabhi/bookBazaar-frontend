import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { environment } from "../../environments/environment";

import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable()

export class Bookservice {

    API_BASE_URL: string;
    
    constructor(private _http: HttpClient) {
        this.API_BASE_URL = environment.API_BASE_URL;
    }

    getBooks() {
        return this._http.get<Book>(this.API_BASE_URL + '/books').pipe(
            map(res => res));
    }

    getBookById(id: any) {
        return this._http.get<Book>(this.API_BASE_URL+ '/books/'+ id).pipe(
            map(res => res)
        );
    }

    
}