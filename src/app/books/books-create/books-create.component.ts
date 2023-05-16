import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { authorsRequestedAction } from '../../authors/store/authors.actions';
import { AuthorModel } from '../../authors/store/authors.model';
import { selectAuthors } from '../../authors/store/authors.selectors';
import { bookCreateAction } from '../store/books.actions';

@Component({
  selector: 'app-books-create',
  templateUrl: './books-create.component.html',
  styleUrls: ['./books-create.component.css']
})
export class BooksCreateComponent implements OnInit {

  booksForm: FormGroup;
  authors$: Observable<AuthorModel[]> = this.store.pipe(select(selectAuthors));

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private store: Store) { }

  ngOnInit() {
    this.store.dispatch(authorsRequestedAction());
    this.booksForm = this.formBuilder.group({
      'title': ['', [Validators.required, Validators.maxLength(50)]]
    });
    this.authors$.subscribe(a => console.log('AUTHORS', a));
  }

  onSubmit(bookData: any) {
    bookData.deleted = false;
    this.store.dispatch(bookCreateAction(bookData));
    this.booksForm.reset();
    this.router.navigate(['/books']);
  }

}