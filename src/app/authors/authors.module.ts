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

import { AuthorsRoutingModule } from './authors-routing.module';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { AuthorsService } from './authors.service';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorsListComponent } from './authors-list/authors-list.component';
import * as fromAuthors from './store/authors.reducer';
import { AuthorEffects } from './store/authors.effects';
import { AuthorsCreateComponent } from './authors-create/authors-create.component';
import { AuthorsUpdateComponent } from './authors-update/authors-update.component';
import { BooksModule } from '../books/books.module';

@NgModule({
  imports: [
    CommonModule, AuthorsRoutingModule, FormsModule, ReactiveFormsModule, RouterModule,
    StoreModule.forFeature(fromAuthors.authorsFeatureKey, fromAuthors.authorsReducer),
    EffectsModule.forFeature([AuthorEffects]),
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    BooksModule
  ],
  declarations: [
    AuthorsComponent, AuthorsListComponent, AuthorsCreateComponent, AuthorsUpdateComponent
  ],
  providers: [
    AuthorsService
  ]
})
export class AuthorsModule { }