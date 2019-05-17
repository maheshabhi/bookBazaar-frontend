import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from "../../environments/environment";

import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { IBook } from './book';

@Injectable()

export class Bookservice {

    API_BASE_URL: string;
    
    constructor(private _http: HttpClient) {
        this.API_BASE_URL = environment.API_BASE_URL;
    }

    getBooks() {
        return this._http.get<IBook>(this.API_BASE_URL + '/books').pipe(
            map(res => res));
    }

    getBookById(id: any) {
        return this._http.get<IBook>(this.API_BASE_URL+ '/books/'+ id).pipe(
            map(res => res)
        );
    }

    addBook(data: IBook,headers) {
        console.log("Adding a book", data);
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
        console.log("Adding a book", data, httpOptions);
        return this._http.post<IBook>(this.API_BASE_URL + '/books', data, headers).pipe(
            map(res => res)
        );
    }
    
}