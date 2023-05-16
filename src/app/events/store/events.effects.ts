import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EventService } from '../../event.service';
import { EventActionTypes, eventsLoadedAction } from './events.actions';

@Injectable()
export class EventEffects {

  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType(EventActionTypes.eventsRequested),
    mergeMap(() => this.eventService.getEvents()
      .pipe(
        map(events => (eventsLoadedAction({events}))),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private eventService: EventService
  ) {}
}