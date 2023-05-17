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
import { regExValidator } from '../../validators/regex.validator';

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
        [Validators.required, regExValidator(/^(?:20\d{2}\/\d{2}\/[1-9])$/i)],
      ],

      start_date: [, [Validators.required]],
      end_date: [, [Validators.required]],
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
      if (this.name.hasError('regEx')) return 'Format: YYYY/YY/Semester';
    }

    return '';
  }
  getDateErrorMessage() {
    if (this.start_date.dirty || this.start_date.touched) {
      if (this.start_date.hasError('required'))
        return 'You must enter a value!';
    }
    if (this.end_date.dirty || this.end_date.touched) {
      if (this.end_date.hasError('required')) return 'You must enter a value!';
    }
    return '';
  }
}
