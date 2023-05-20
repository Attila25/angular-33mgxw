import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from '../../app/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LogoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: LogoutComponent,
          },
        ],
      },
    ],
  },
  { path: '', redirectTo: '/logout', pathMatch: 'full' },
  { path: '**', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogoutRoutingModule {}
