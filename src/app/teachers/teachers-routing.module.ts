import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../app/auth/auth.guard';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TeacherSubjectListComponent } from './teachersubject-list/teachersubject-list.component';

const routes: Routes = [
  {
    path: '',
    component: TeachersComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: TeachersListComponent,
          },
          {
            path: 'list',
            component: TeacherSubjectListComponent,
          },
          /*{
          path: 'details/:eventId',
          component: EventDetailsComponent
        },*/
        ],
      },
    ],
  },
  { path: '', redirectTo: '/teachers', pathMatch: 'full' },
  { path: '**', component: TeachersListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersRoutingModule {}
