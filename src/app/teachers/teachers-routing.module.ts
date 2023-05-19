import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../app/auth/auth.guard';
import { TeachersCreateComponent } from './teachers-create/teachers-create.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { TeachersUpdateComponent } from './teachers-update/teachers-update.component';
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
            path: 'sub/:teacherId/:semesterId',
            component: TeacherSubjectListComponent,
          },
          {
            path: 'create',
            component: TeachersCreateComponent,
          },
          {
            path: 'edit/:teacherId',
            component: TeachersUpdateComponent,
          },
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
