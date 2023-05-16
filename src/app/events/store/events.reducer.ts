import { createReducer, on, Action } from '@ngrx/store';

import { eventsLoadedAction, deleteEvent } from './events.actions';
import { Event } from './events.model';

export const eventsFeatureKey = 'events';

export interface EventsFeatureState {
  events: Array<Event>;
}

export const initialState: EventsFeatureState = {
  events: []
};

export const eventsReducer = createReducer(
  initialState,
  on(eventsLoadedAction, (state, {events}) => ({...state, events})),
  on(deleteEvent, (state, { eventId }) => {
    return {
      events: state.events.filter(evt => evt.id !== eventId)
    }
  })
)