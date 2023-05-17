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
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsService } from './students.service';
import { StudentEffects } from './store/students.effects';
import * as fromStudents from './store/students.reducer';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsComponent } from './students/students.component';
import { StudentsCreateComponent } from './students-create/students-create.component';

@NgModule({
  imports: [
    CommonModule,
    StudentsRoutingModule,
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
      fromStudents.studentsFeatureKey,
      fromStudents.studentsReducer
    ),
    EffectsModule.forFeature([StudentEffects]),
  ],
  declarations: [
    StudentsComponent,
    StudentsListComponent,
    StudentsCreateComponent,
  ],
  providers: [StudentsService],
})
export class StudentsModule {}
