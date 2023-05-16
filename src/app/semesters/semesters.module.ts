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
import { SemestersRoutingModule } from './semesters-routing.module';
import { SemestersService } from './semesters.service';
import { SemesterEffects } from './store/semesters.effects';
import * as fromSemesters from './store/semesters.reducer';
import { SemestersListComponent } from './semesters-list/semesters-list.component';
import { SemestersComponent } from './semesters/semesters.component';
import { SemestersCreateComponent } from './semesters-create/semesters-create.component';

@NgModule({
  imports: [
    CommonModule,
    SemestersRoutingModule,
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
      fromSemesters.semestersFeatureKey,
      fromSemesters.semestersReducer
    ),
    EffectsModule.forFeature([SemesterEffects]),
  ],
  declarations: [
    SemestersComponent,
    SemestersListComponent,
    SemestersCreateComponent,
  ],
  providers: [SemestersService],
})
export class SemestersModule {}
