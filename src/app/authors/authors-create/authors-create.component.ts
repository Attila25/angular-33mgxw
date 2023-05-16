import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectNextAuthorId } from '../store/authors.selectors';
import { AuthorActionTypes, authorsLoadedAction, authorCreateAction } from '../store/authors.actions';

@Component({
  selector: 'app-authors-create',
  templateUrl: './authors-create.component.html',
  styleUrls: ['./authors-create.component.css']
})
export class AuthorsCreateComponent implements OnInit {

  authorsForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private store: Store) { }

  ngOnInit() {
    this.authorsForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.maxLength(50)]],
      'birthYear': [1980, [Validators.required]],
      'nationality': ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  onSubmit(authorData: any) {
    authorData.deleted = false;
    this.store.dispatch(authorCreateAction(authorData));
    this.authorsForm.reset();
    this.router.navigate(['/authors']);
  }

  get name() { return this.authorsForm.get('name'); }
  get birthYear() { return this.authorsForm.get('birthYear'); }
  get nationality() { return this.authorsForm.get('nationality'); }

  getNameErrorMessage() {
    if (this.name.dirty || this.name.touched) {
      if (this.name.hasError('required')) return 'You must enter a value!';
      if (this.name.hasError('maxlength')) return 'You can enter at most 50 characters!';
    }
    return '';
  }

  getDescriptionErrorMessage() {
    if (this.birthYear.dirty || this.birthYear.touched) {
      if (this.birthYear.hasError('required')) return 'You must enter a value!';
      if (this.birthYear.hasError('maxlength')) return 'You can enter at most 100 characters!';
    }
    return '';
  }

  getStartErrorMessage() {
    if (this.nationality.dirty || this.nationality.touched) {
      if (this.nationality.hasError('required')) return 'You must enter a value!';
      if (this.nationality.hasError('regEx')) return 'You must enter a valid date time!';
    }
    return '';
  }

}