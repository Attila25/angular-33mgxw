import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectLoadedAuthor } from '../store/authors.selectors';
import { AuthorActionTypes, authorsLoadedAction, authorUpdateAction, authorRequestedAction } from '../store/authors.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-authors-update',
  templateUrl: './authors-update.component.html',
  styleUrls: ['./authors-update.component.css']
})
export class AuthorsUpdateComponent implements OnInit {

  authorsForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      map(params => {
        return this.store.dispatch(authorRequestedAction({authorId: +params.get('authorId')}))})
    ).subscribe();
    this.store.pipe(select(selectLoadedAuthor)).subscribe(
      author => {
        if(author && this.authorsForm) {
          this.authorsForm.controls.id.setValue(author.id);
          this.authorsForm.controls.name.setValue(author.name);
          this.authorsForm.controls.birthYear.setValue(author.birthYear);
          this.authorsForm.controls.nationality.setValue(author.nationality);
        }
      }
    );
    this.authorsForm = this.formBuilder.group({
      'id': [{value: 0, disabled: true}, [Validators.required]],
      'name': ['', [Validators.required, Validators.maxLength(50)]],
      'birthYear': [1980, [Validators.required]],
      'nationality': ['', [Validators.required, Validators.maxLength(100)]],
      'deleted': [false]
    });
  }

  onSubmit(authorData: any) {
    this.store.dispatch(authorUpdateAction(authorData));
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