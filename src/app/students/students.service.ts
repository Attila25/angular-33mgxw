import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { RequestService } from '../../app/request.service';
import { Student } from '../../app/data/students.data';
import { StudentModel } from './store/students.model';

import { catchError, tap } from 'rxjs/operators';

const STUDENT_URL = 'api/students';

@Injectable()
export class StudentsService {
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

  getStudents(): Observable<StudentModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<StudentModel[]>(STUDENT_URL, httpOptions);
  }

  getStudent(studentId: number): Observable<any> {
    return this.requestService.get(`${STUDENT_URL}/${studentId}`);
  }

  createStudent(student: StudentModel): Observable<any> {
    return this.requestService.post(`${STUDENT_URL}/`, student);
  }
}
