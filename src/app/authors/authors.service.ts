import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, exhaustMap } from 'rxjs/operators';
import { Author } from '../data/authors.data';
import { AuthorModel } from './store/authors.model';
import { BooksService } from '../books/books.service';

const AUTHOR_URL = 'api/authors';

@Injectable()
export class AuthorsService {

  constructor(private requestService: RequestService,
  private booksService: BooksService) { }

  getAuthors(): Observable<Author[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.requestService.get<Author[]>(`${AUTHOR_URL}/?deleted=false`, httpOptions);
  }

  getAuthor(authorId: number): Observable<any>{
    return this.requestService.get(`${AUTHOR_URL}/${authorId}`);
  }

  createAuthor(author: AuthorModel): Observable<any> {
    return this.requestService.post(`${AUTHOR_URL}/`, author);
  }

  updateAuthor(author: AuthorModel): Observable<any> {
    return this.requestService.put(`${AUTHOR_URL}/`, author);
  }

  deleteAuthor(author: AuthorModel): Observable<any> {
    return this.booksService.getBooks().pipe(
      exhaustMap(res => {
        if(res.filter(b => b.authorId === author.id).length > 0){
          throw new Error('Cannot delete author!');
        }
        author = Object.assign({}, author, {deleted: true});
        return this.updateAuthor(author);
      })
    );
  }

}