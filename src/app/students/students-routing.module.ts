import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../app/auth/auth.guard';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: StudentsListComponent,
          },
          /*{
          path: 'details/:eventId',
          component: EventDetailsComponent
        },*/
        ],
      },
    ],
  },
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: '**', component: StudentsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
