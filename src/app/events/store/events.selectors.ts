import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app.module';
import { EventsFeatureState } from './events.reducer';
import { eventsFeatureKey } from './events.reducer';
import { EventsFeatureState } from './events.reducer';

export const selectFeature = createFeatureSelector<AppState, EventsFeatureState>(eventsFeatureKey);

export const selectEvents = createSelector(
  selectFeature,
  (state: EventsFeatureState) => {
    return state.events;
  }
)