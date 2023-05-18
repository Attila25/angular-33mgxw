import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  selectLoadedSemester,
  selectNextSemesterId,
} from '../store/semesters.selectors';
import {
  semesterRequestedAction,
  semesterUpdateAction,
} from '../store/semesters.actions';
import { Observable } from 'rxjs';
import { regExValidator } from '../../validators/regex.validator';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-semesters-update',
  templateUrl: './semesters-update.component.html',
  styleUrls: ['./semesters-update.component.css'],
})
export class SemestersUpdateComponent implements OnInit {
  semestersForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => {
          return this.store.dispatch(
            semesterRequestedAction({ semesterId: +params.get('semesterId') })
          );
        })
      )
      .subscribe();
    this.store.pipe(select(selectLoadedSemester)).subscribe((semester) => {
      if (semester && this.semestersForm) {
        this.semestersForm.controls.id.setValue(semester.id);
        this.semestersForm.controls.name.setValue(semester.name);
        this.semestersForm.controls.start_date.setValue(
          formatDate(semester.start_date, 'yyyy-MM-dd', 'en')
        );
        this.semestersForm.controls.end_date.setValue(
          formatDate(semester.end_date, 'yyyy-MM-dd', 'en')
        );
      }
    });

    this.semestersForm = this.formBuilder.group({
      id: [{ value: 0, disabled: true }, [Validators.required]],
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

    this.store.dispatch(semesterUpdateAction(semesterData));
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
