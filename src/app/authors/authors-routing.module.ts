import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { AuthorsCreateComponent } from './authors-create/authors-create.component';
import { AuthorsListComponent } from './authors-list/authors-list.component';
import { AuthorsUpdateComponent } from './authors-update/authors-update.component';
import { AuthorsComponent } from './authors/authors.component';

const routes: Routes = [
  { path: '',
    component: AuthorsComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      canActivateChild: [AuthGuard],
      children: [
        {
          path: '',
          component: AuthorsListComponent
        },
        {
          path: 'edit/:authorId',
          component: AuthorsUpdateComponent
        },
        {
          path: 'create',
          component: AuthorsCreateComponent
        }
      ]
    }]
  },
  { path: '', redirectTo: '/authors', pathMatch: 'full' }, 
  { path: '**', component: AuthorsListComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthorsRoutingModule { }