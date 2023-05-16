import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventTable } from '../event-list/events';
import { EventService } from '../event.service';
import { switchMap,catchError, map,startWith,debounceTime, retry ,tap} from 'rxjs/operators';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  events = [];
  event: any = {};

  constructor(private route: ActivatedRoute,
              private eventService: EventService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => this.eventService.getEvent(+params.get('eventId')))
    )
    .subscribe(event => {
      this.event = event;
    });
  }

}