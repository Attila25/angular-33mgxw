import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksComponent } from './books/books.component';
import { AuthGuard } from '../auth/auth.guard';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksCreateComponent } from './books-create/books-create.component';

const routes: Routes = [
  { path: '',
    component: BooksComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      canActivateChild: [AuthGuard],
      children: [
        {
          path: '',
          component: BooksListComponent
        },
        /*{
          path: 'details/:eventId',
          component: EventDetailsComponent
        },*/
        {
          path: 'create',
          component: BooksCreateComponent
        }
      ]
    }]
  },
  { path: '', redirectTo: '/books', pathMatch: 'full' }, 
  { path: '**', component: BooksListComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BooksRoutingModule { }