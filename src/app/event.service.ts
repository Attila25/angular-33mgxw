import { Injectable } from '@angular/core';
import { EventTable } from './event-list/events';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime } from 'rxjs/operators';

const EVENT_URL = 'api/events';

@Injectable()
export class EventService {

  constructor(private requestService: RequestService) { }

  getEvents(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.requestService.get<any>(EVENT_URL, httpOptions);
  }

  getEvent(eventId): Observable<any>{
    return this.requestService.get(`${EVENT_URL}/${eventId}`);
  }

  createEvent(event: any): Observable<any> {
    return this.requestService.post(`${EVENT_URL}/`, event);
  }

  updateEvent(event: any): Observable<any> {
    return this.requestService.put(`${EVENT_URL}/`, event);
  }

  deleteEvent(eventId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const url = `${EVENT_URL}/${eventId}`;
    return this.requestService.delete(url, httpOptions);
  }

  eventNameExists(name: string): Observable<boolean> {
    return this.getEvents().pipe(
      map(events => {
        return events.findIndex(event => event.name === name) !== -1;
      })
    );
  }

}