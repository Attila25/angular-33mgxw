import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../app/auth/auth.guard';
import { SubjectsCreateComponent } from './subjects-create/subjects-create.component';
import { SubjectsListComponent } from './subjects-list/subjects-list.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectsUpdateComponent } from './subjects-update/subjects-update.component';

const routes: Routes = [
  {
    path: '',
    component: SubjectsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: SubjectsListComponent,
          },
          {
            path: 'create',
            component: SubjectsCreateComponent,
          },
          {
            path: 'edit/:subjectId',
            component: SubjectsUpdateComponent,
          },
        ],
      },
    ],
  },
  { path: '', redirectTo: '/subjects', pathMatch: 'full' },
  { path: '**', component: SubjectsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectsRoutingModule {}
