import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';

import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersService } from './teachers.service';
import { TeacherEffects } from './store/teachers.effects';
import * as fromTeachers from './store/teachers.reducer';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TeacherSubjectListComponent } from './teachersubject-list/teachersubject-list.component';

@NgModule({
  imports: [
    CommonModule,
    TeachersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    StoreModule.forFeature(
      fromTeachers.teachersFeatureKey,
      fromTeachers.teachersReducer
    ),
    EffectsModule.forFeature([TeacherEffects]),
  ],
  declarations: [
    TeachersComponent,
    TeachersListComponent,
    TeacherSubjectListComponent,
  ],
  providers: [TeachersService],
})
export class TeachersModule {}
