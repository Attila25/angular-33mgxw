import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { RequestService } from '../../app/request.service';
import { Subject } from '../../app/data/subjects.data';
import { SubjectModel } from './store/subjects.model';
import { catchError, tap } from 'rxjs/operators';

const SUBJECT_URL = 'api/subjects';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  constructor(private requestService: RequestService, private store: Store) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getSubjects(): Observable<SubjectModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<SubjectModel[]>(SUBJECT_URL, httpOptions);
  }

  searchSubjects(term: string): Observable<SubjectModel[]> {
    if (!term.trim()) {
    }
    return this.requestService
      .get<SubjectModel[]>(`${SUBJECT_URL}/?name=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? console.log(`found teachers matching "${term}"`)
            : console.log(`no teachers matching "${term}"`)
        ),
        catchError(this.handleError<SubjectModel[]>('searchTeachers', []))
      );
  }

  getSubject(id: number): Observable<any> {
    const url = `${SUBJECT_URL}/${id}`;
    return this.requestService.get<SubjectModel>(url).pipe(
      tap((_) => console.log(`fetched hero id=${id}`)),
      catchError(this.handleError<SubjectModel>(`getHero id=${id}`))
    );
  }

  createSubject(subject: SubjectModel): Observable<any> {
    return this.requestService.post(`${SUBJECT_URL}/`, subject);
  }
}
