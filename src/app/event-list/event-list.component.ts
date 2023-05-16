import { Component, OnInit } from '@angular/core';
import { EventTable } from './events';
import { EventService } from '../event.service';
import { Observable, Observer, fromEvent, of} from 'rxjs';
import { switchMap,catchError, map,startWith,debounceTime, retry ,tap} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { selectEvents } from '../events/store/events.selectors';
import { eventsRequestedAction, deleteEvent, eventsLoadedAction } from '../events/store/events.actions';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  constructor(private eventService: EventService,
              private store: Store) { }

  events$ = this.store.pipe(select(selectEvents));

  ngOnInit() {
      this.store.dispatch(eventsRequestedAction());
  }

  onDeleteEvent(eventId: number): void {
    this.eventService.deleteEvent(eventId).subscribe(res => {
      this.store.dispatch(deleteEvent({eventId}));
    });
  }

  onNotify(event){
    alert('Event \'' + event.name + '\' liked');
  }

}