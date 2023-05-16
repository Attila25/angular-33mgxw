import { Injectable } from '@angular/core';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { EventService } from '../event.service';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime } from 'rxjs/operators';

@Injectable()
export class EventNameValidator {
  
  constructor(private eventService: EventService) {}

  eventNameValidatorFn(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.eventService.eventNameExists(control.value).pipe(
        map(exists => (exists ? { eventName: true } : null)),
        catchError(() => of(null))
      );
    };
  }
}