import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { RequestService } from '../../app/request.service';
import { Semester } from '../../app/data/semesters.data';
import { SemesterModel } from './store/semesters.model';
import { catchError, tap } from 'rxjs/operators';

const SEMESTER_URL = 'api/semesters';

@Injectable({
  providedIn: 'root',
})
export class SemestersService {
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

  getSemesters(): Observable<SemesterModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<SemesterModel[]>(SEMESTER_URL, httpOptions);
  }

  getSemester(semesterId: number): Observable<any> {
    return this.requestService.get(`${SEMESTER_URL}/${semesterId}`);
  }

  updateSemester(semester: SemesterModel): Observable<any> {
    return this.requestService.put(`${SEMESTER_URL}/`, semester);
  }

  createSemester(semester: SemesterModel): Observable<any> {
    return this.requestService.post(`${SEMESTER_URL}/`, semester);
  }
}
