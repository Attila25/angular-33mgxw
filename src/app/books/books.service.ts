import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { Book } from '../data/books.data';
import { BookModel } from './store/books.model';
import { Store } from '@ngrx/store';
import { selectAuthors } from '../authors/store/authors.selectors';


const BOOK_URL = 'api/books';

@Injectable()
export class BooksService {

  constructor(private requestService: RequestService,
              private store: Store) { }

  getBooks(): Observable<Book[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.requestService.get<Book[]>(BOOK_URL, httpOptions);
  }

  getBook(bookId: number): Observable<any>{
    return this.requestService.get(`${BOOK_URL}/${bookId}`);
  }

  createBook(book: BookModel): Observable<any> {
    return this.requestService.post(`${BOOK_URL}/`, book);
  }

}