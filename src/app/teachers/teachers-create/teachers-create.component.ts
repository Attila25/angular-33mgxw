import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { teacherCreateAction } from '../store/teachers.actions';

@Component({
  selector: 'app-teachers-create',
  templateUrl: './teachers-create.component.html',
  styleUrls: ['./teachers-create.component.css'],
})
export class TeachersCreateComponent implements OnInit {
  teachersForm: FormGroup;
  subjects$: Observable<SubjectModel[]> = this.store.pipe(
    select(selectSubjects)
  );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(authorsRequestedAction());
    this.teachersForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
    });
    //this.authors$.subscribe(a => console.log('AUTHORS', a));
  }

  onSubmit(teacherData: any) {
    teacherData.deleted = false;
    this.store.dispatch(teacherCreateAction(teacherData));
    this.teachersForm.reset();
    this.router.navigate(['/teachers']);
  }
}
