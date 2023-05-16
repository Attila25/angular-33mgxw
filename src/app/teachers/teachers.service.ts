import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { RequestService } from '../../app/request.service';
import { Teacher } from '../../app/data/teachers.data';
import { TeacherModel } from './store/teachers.model';
import { catchError, tap } from 'rxjs/operators';

const TEACHER_URL = 'api/teachers';

@Injectable()
export class TeachersService {
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

  getTeachers(): Observable<TeacherModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<TeacherModel[]>(TEACHER_URL, httpOptions);
  }

  getTeacher(id: number): Observable<any> {
    const url = `${TEACHER_URL}/${id}`;
    return this.requestService.get<TeacherModel>(url).pipe(
      tap((_) => console.log(`fetched hero id=${id}`)),
      catchError(this.handleError<TeacherModel>(`getHero id=${id}`))
    );
  }

  searchTeachers(term: string): Observable<TeacherModel[]> {
    if (!term.trim()) {
    }
    return this.requestService
      .get<TeacherModel[]>(
        `${TEACHER_URL}/?name=${term}`
      )
      .pipe(
        tap((x) =>
          x.length
            ? console.log(`found teachers matching "${term}"`)
            : console.log(`no teachers matching "${term}"`)
        ),
        catchError(this.handleError<TeacherModel[]>('searchTeachers', []))
      );
  }

  createTeacher(teacher: TeacherModel): Observable<any> {
    return this.requestService.post(`${TEACHER_URL}/`, teacher);
  }
}
