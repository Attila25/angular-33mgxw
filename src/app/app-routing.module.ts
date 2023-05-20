import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'events',
    loadChildren: () =>
      import('./events/events.module').then((m) => m.EventsModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./books/books.module').then((m) => m.BooksModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'authors',
    loadChildren: () =>
      import('./authors/authors.module').then((m) => m.AuthorsModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'teachers',
    loadChildren: () =>
      import('./teachers/teachers.module').then((m) => m.TeachersModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'subjects',
    loadChildren: () =>
      import('./subjects/subjects.module').then((m) => m.SubjectsModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./students/students.module').then((m) => m.StudentsModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'semesters',
    loadChildren: () =>
      import('./semesters/semesters.module').then((m) => m.SemestersModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    canLoad: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
