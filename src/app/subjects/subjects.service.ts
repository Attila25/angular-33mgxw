import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { RequestService } from '../../app/request.service';
import { Subject } from '../../app/data/subjects.data';
import { SubjectModel } from './store/subjects.model';

const SUBJECT_URL = 'api/subjects';

@Injectable()
export class SubjectsService {
  constructor(private requestService: RequestService, private store: Store) {}

  getSubjects(): Observable<SubjectModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<SubjectModel[]>(SUBJECT_URL, httpOptions);
  }

  createSubject(subject: SubjectModel): Observable<any> {
    return this.requestService.post(`${SUBJECT_URL}/`, subject);
  }
}
