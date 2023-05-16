import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectNextSemesterId } from '../store/semesters.selectors';
import {
  SemesterActionTypes,
  semestersLoadedAction,
  semesterCreateAction,
} from '../store/semesters.actions';

@Component({
  selector: 'app-semesters-create',
  templateUrl: './semesters-create.component.html',
  styleUrls: ['./semesters-create.component.css'],
})
export class SemestersCreateComponent implements OnInit {
  semestersForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.semestersForm = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ],
      start_date: [2023, [Validators.required]],
      end_date: [2024, [Validators.required]],
    });
  }

  onSubmit(semesterData: any) {
    semesterData.deleted = false;
    this.store.dispatch(semesterCreateAction(semesterData));
    this.semestersForm.reset();
    this.router.navigate(['/semesters']);
  }

  get name() {
    return this.semestersForm.get('name');
  }
  get start_date() {
    return this.semestersForm.get('start_date');
  }
  get end_date() {
    return this.semestersForm.get('end_date');
  }

  getNameErrorMessage() {
    if (this.name.dirty || this.name.touched) {
      if (this.name.hasError('minLength'))
        return 'You have to enter 9 characters!';
      if (this.name.hasError('maxLength'))
        return 'You have to enter 9 characters!';
    }
    return '';
  }

  getDescriptionErrorMessage() {
    if (this.start_date.dirty || this.start_date.touched) {
      if (this.start_date.hasError('required'))
        return 'You must enter a value!';
      if (this.start_date.hasError('maxlength'))
        return 'You can enter at most 100 characters!';
    }
    return '';
  }
}
