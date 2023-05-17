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
import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsService } from './subjects.service';
import { SubjectEffects } from './store/subjects.effects';
import * as fromSubjects from './store/subjects.reducer';
import { SubjectsListComponent } from './subjects-list/subjects-list.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectsCreateComponent } from './subjects-create/subjects-create.component';

@NgModule({
  imports: [
    CommonModule,
    SubjectsRoutingModule,
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
      fromSubjects.subjectsFeatureKey,
      fromSubjects.subjectsReducer
    ),
    EffectsModule.forFeature([SubjectEffects]),
  ],
  declarations: [
    SubjectsComponent,
    SubjectsListComponent,
    SubjectsCreateComponent,
  ],
  providers: [SubjectsService],
})
export class SubjectsModule {}
