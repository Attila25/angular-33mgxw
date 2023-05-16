import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event-social',
  templateUrl: './event-social.component.html',
  styleUrls: ['./event-social.component.css']
})
export class EventSocialComponent implements OnInit, OnChanges {

  @Input() event: any;
  @Output() notify = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  like() {
    this.notify.emit(this.event);
  }

}