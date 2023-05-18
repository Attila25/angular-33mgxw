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
  selectLoadedSubject,
  selectNextSubjectId,
} from '../store/subjects.selectors';
import {
  SubjectActionTypes,
  subjectsLoadedAction,
  subjectCreateAction,
  subjectRequestedAction,
  subjectUpdateAction,
} from '../store/subjects.actions';
import { SubjectTable } from '../../data/subjects.data';
import { SubjectModel } from '../../subjects/store/subjects.model';
import { selectSubjects } from '../../subjects/store/subjects.selectors';
import { Observable } from 'rxjs';
import { subjectsRequestedAction } from '../../subjects/store/subjects.actions';
import { SubjectsService } from '../../subjects/subjects.service';
import { regExValidator } from '../../validators/regex.validator';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-subjects-update',
  templateUrl: './subjects-update.component.html',
  styleUrls: ['./subjects-update.component.css'],
})
export class SubjectsUpdateComponent implements OnInit {
  subjectsForm: FormGroup;
  subjectConv: SubjectModel[];

  subjects$: Observable<SubjectModel[]> = this.store.pipe(
    select(selectSubjects)
  );

  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => {
          return this.store.dispatch(
            subjectRequestedAction({ subjectId: +params.get('subjectId') })
          );
        })
      )
      .subscribe();
    this.store.pipe(select(selectLoadedSubject)).subscribe((subject) => {
      if (subject && this.subjectsForm) {
        this.subjectsForm.controls.id.setValue(subject.id);
        this.subjectsForm.controls.neptun.setValue(subject.neptun);
        this.subjectsForm.controls.name.setValue(subject.name);
        this.subjectsForm.controls.email.setValue(subject.email);
        this.subjectsForm.controls.position.setValue(subject.position);
        this.subjectsForm.controls.subjectId.setValue(subject.subjectId);
      }
    });

    this.subjectsForm = this.formBuilder.group({
      id: [{ value: 0, disabled: true }, [Validators.required]],
      neptun: [
        '',
        [Validators.required, regExValidator(/^(?!^\d)([a-zA-Z0-9]{6})$/i)],
      ],
      name: [, [Validators.required, Validators.maxLength(50)]],
      email: [, [Validators.required, Validators.email]],
      position: [, [Validators.required]],
      subjectId: [, [Validators.required]],
      subjects_t: [[], []],
      deleted: [false],
    });

    this.store.dispatch(subjectsRequestedAction());
  }

  onSubmit(subjectData: any) {
    this.subjects$.subscribe((subject) => {
      this.subjectConv = subject as SubjectModel[];
    });

    subjectData.deleted = false;
    subjectData.subjectIds = subjectData.subjectId.split(',');

    subjectData.subjectIds.forEach((x) => {
      const subject = this.subjectConv.find((y) => y.id == x);
      console.log(this.subjectConv);
      if (subject != undefined) subjectData.subjects_t.push(subject.name);
    });

    this.store.dispatch(subjectUpdateAction(subjectData));
    this.subjectsForm.reset();
    this.router.navigate(['/subjects']);
  }

  get neptun() {
    return this.subjectsForm.get('neptun');
  }
  get name() {
    return this.subjectsForm.get('name');
  }
  get email() {
    return this.subjectsForm.get('email');
  }
  get position() {
    return this.subjectsForm.get('position');
  }
  get subjectId() {
    return this.subjectsForm.get('subjectId');
  }

  getNeptunErrorMessage() {
    if (this.neptun.dirty || this.neptun.touched) {
      if (this.neptun.hasError('regEx'))
        return 'Can only consist of 6 letters or numbers. Firt character cant be number';
    }
    return '';
  }

  getNameErrorMessage() {
    if (this.name.dirty || this.name.touched) {
      if (this.name.hasError('required')) return 'You must enter a value!';
      if (this.name.hasError('maxlength'))
        return 'You can enter at most 50 characters!';
    }
    if (this.email.dirty || this.email.touched) {
      if (this.email.hasError('required')) return 'You must enter a value!';
    }
    if (this.position.dirty || this.position.touched) {
      if (this.position.hasError('required')) return 'You must enter a value!';
    }
    if (this.email.dirty || this.email.touched) {
      if (this.email.hasError('email')) return 'You must enter a valid email!';
    }
    return '';
  }
}
