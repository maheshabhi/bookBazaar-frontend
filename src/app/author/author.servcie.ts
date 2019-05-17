import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";
import { Author } from "./author";
@Injectable()

export class AuthorService {

    API_BASE_URL = environment.API_BASE_URL;

    constructor(private _http: HttpClient) {}

    authorRegister(data: Author) {

        const httpOptions  = { 
            headers: new HttpHeaders({'Content-Type' : 'application/json'})
        };

        return this._http.post<Author>(this.API_BASE_URL+ '/book/author/register', data, httpOptions).pipe(
            map((response) => response)
        );
    }

    authorLogin(data) {
    
        return this._http.post<Author>(this.API_BASE_URL+ '/book/author/login', data).pipe(
            map((response) => response)
        );
    }

}