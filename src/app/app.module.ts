import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { InMemoryEventService } from './in-memory-event.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from '../environments/environment';
import { RequestService } from './request.service';
import { httpInterceptorProviders } from './http-interceptors';
import { AuthService } from './auth.service';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TeachersFeatureState } from './teachers/store/teachers.reducer';
import { SubjectsFeatureState } from './subjects/store/subjects.reducer';
import { StudentsFeatureState } from './students/store/students.reducer';
import { SemestersFeatureState } from './semesters/store/semesters.reducer';
import { LoginService } from './login/login.service';

export interface AppState {
  teacherFeature: TeachersFeatureState;
  subjectFeature: SubjectsFeatureState;
  studentFeature: StudentsFeatureState;
  semesterFeature: SemestersFeatureState;
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(InMemoryEventService)
      : [],
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
  providers: [
    InMemoryEventService,
    RequestService,
    httpInterceptorProviders,
    AuthService,
    LoginService,
  ],
})
export class AppModule {}
