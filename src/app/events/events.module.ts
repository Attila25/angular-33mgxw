import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';

import { HighlightDirective } from '../directives/highlight.directive';
import { FirstLetterPipe } from '../pipes/first-letter.pipe';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventListComponent } from '../event-list/event-list.component';
import { EventSocialComponent } from '../event-social/event-social.component';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { EventService } from '../event.service';
import { EventCreateComponent } from '../event-create/event-create.component';
import { EventNameValidator } from '../validators/event-name.validator';
import * as fromEvents from './store/events.reducer';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { EventEffects } from './store/events.effects';

@NgModule({
  imports: [
    CommonModule, EventsRoutingModule, FormsModule, ReactiveFormsModule, RouterModule,
    StoreModule.forFeature(fromEvents.eventsFeatureKey, fromEvents.eventsReducer),
    EffectsModule.forFeature([EventEffects]),
     MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    EventListComponent, EventSocialComponent,
    EventDetailsComponent, EventCreateComponent,
    EventsComponent, HighlightDirective, FirstLetterPipe
  ],
  providers: [
    EventService, EventNameValidator
  ]
})
export class EventsModule { }