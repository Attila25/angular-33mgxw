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

import { BooksRoutingModule } from './books-routing.module';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { BooksComponent } from './books/books.component';
import { BooksService } from './books.service';
import { BooksListComponent } from './books-list/books-list.component';
import * as fromBooks from './store/books.reducer';
import { BookEffects } from './store/books.effects';
import { BooksCreateComponent } from './books-create/books-create.component';

@NgModule({
  imports: [
    CommonModule, BooksRoutingModule, FormsModule, ReactiveFormsModule, RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    StoreModule.forFeature(fromBooks.booksFeatureKey, fromBooks.booksReducer),
    EffectsModule.forFeature([BookEffects]),
  ],
  declarations: [
    BooksComponent, BooksListComponent, BooksCreateComponent
  ],
  providers: [
    BooksService
  ]
})
export class BooksModule { }