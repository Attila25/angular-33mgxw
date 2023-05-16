import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { RequestService } from '../../app/request.service';
import { Semester } from '../../app/data/semesters.data';
import { SemesterModel } from './store/semesters.model';

const SEMESTER_URL = 'api/semesters';

@Injectable()
export class SemestersService {
  constructor(private requestService: RequestService, private store: Store) {}

  getSemesters(): Observable<SemesterModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<SemesterModel[]>(SEMESTER_URL, httpOptions);
  }

  createSemester(semester: SemesterModel): Observable<any> {
    return this.requestService.post(`${SEMESTER_URL}/`, semester);
  }
}
