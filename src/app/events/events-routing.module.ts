import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventListComponent } from '../event-list/event-list.component';
import { EventsComponent } from './events.component';
import { EventSocialComponent } from '../event-social/event-social.component';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { EventCreateComponent } from '../event-create/event-create.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '',
    component: EventsComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      canActivateChild: [AuthGuard],
      children: [
        {
          path: '',
          component: EventListComponent
        },
        {
          path: 'details/:eventId',
          component: EventDetailsComponent
        },
        {
          path: 'create',
          component: EventCreateComponent
        }
      ]
    }]
  },
  { path: '', redirectTo: '/events', pathMatch: 'full' }, 
  { path: '**', component: EventListComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EventsRoutingModule { }