import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from "@angular/common/http";
import { Bookservice } from './books/books.service';
import { tap } from "rxjs/operators";

@Injectable() 

export class AuthInterceptor implements HttpInterceptor {

    constructor(private _bookService: Bookservice) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        const bookReq = req.clone({
            headers: req.headers.set('Content-Type', 'application/json')
        });
        return next.handle(bookReq);
    }
}