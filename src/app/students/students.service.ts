import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { RequestService } from '../../app/request.service';
import { Student } from '../../app/data/students.data';
import { StudentModel } from './store/students.model';

const STUDENT_URL = 'api/students';

@Injectable()
export class StudentsService {
  constructor(private requestService: RequestService, private store: Store) {}

  getStudents(): Observable<StudentModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<StudentModel[]>(STUDENT_URL, httpOptions);
  }

  createStudent(student: StudentModel): Observable<any> {
    return this.requestService.post(`${STUDENT_URL}/`, student);
  }
}
