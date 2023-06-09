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
  selectLoadedTeacher,
  selectNextTeacherId,
} from '../store/teachers.selectors';
import {
  TeacherActionTypes,
  teachersLoadedAction,
  teacherCreateAction,
  teacherRequestedAction,
  teacherUpdateAction,
} from '../store/teachers.actions';
import { SubjectTable } from '../../data/subjects.data';
import { SubjectModel } from '../../subjects/store/subjects.model';
import { selectSubjects } from '../../subjects/store/subjects.selectors';
import { Observable } from 'rxjs';
import { subjectsRequestedAction } from '../../subjects/store/subjects.actions';
import { SubjectsService } from '../../subjects/subjects.service';
import { regExValidator } from '../../validators/regex.validator';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherModel } from '../store/teachers.model';

@Component({
  selector: 'app-teachersubject-list',
  templateUrl: './teachersubject-list.component.html',
  styleUrls: ['./teachersubject-list.component.css'],
})
export class TeacherSubjectListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'semesters_s'];

  teacher: TeacherModel;
  subjectConv: SubjectModel[];
  subjectList: SubjectModel[];

  semester: number;

  subjects$: Observable<SubjectModel[]> = this.store.pipe(
    select(selectSubjects)
  );

  dataSource = new MatTableDataSource<SubjectModel>();

  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(subjectsRequestedAction());

    this.semester = Number(this.route.snapshot.paramMap.get('semesterId'));

    this.subjects$.subscribe((subject) => {
      this.subjectConv = subject as SubjectModel[];
    });

    this.route.paramMap
      .pipe(
        map((params) => {
          return this.store.dispatch(
            teacherRequestedAction({ teacherId: +params.get('teacherId') })
          );
        })
      )
      .subscribe();

    this.store.pipe(select(selectLoadedTeacher)).subscribe((teacher) => {
      if (teacher) {
        this.teacher = teacher;
      }
    });
    this.subjectList = [];
    console.log(this.teacher);
    this.teacher.subjectId.forEach((x) => {
      const subject = this.subjectConv.find((y) => y.id == x);
      if (subject != undefined)
        subject.semesterId.forEach((x) => {
          if (x == this.semester) {
            console.log(subject);
            this.subjectList.push(subject);
          }
        });
    });
  }
}
