import { createAction, props } from '@ngrx/store';

export enum EventActionTypes {
  eventsRequested = '[Events] Events Requested',
  eventsLoaded = '[Events] Events Loaded'
}

export const eventsRequestedAction = createAction(
  EventActionTypes.eventsRequested
);
export const eventsLoadedAction = createAction(
  EventActionTypes.eventsLoaded,
  props<{events: Event[]}>()
);

export const deleteEvent = createAction(
  '[Events] Delete Event',
  props<{eventId}>()
);