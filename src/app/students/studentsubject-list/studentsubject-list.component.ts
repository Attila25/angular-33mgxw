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
  selectLoadedStudent,
  selectNextStudentId,
} from '../store/students.selectors';
import {
  StudentActionTypes,
  studentsLoadedAction,
  studentCreateAction,
  studentRequestedAction,
  studentUpdateAction,
} from '../store/students.actions';
import { SubjectTable } from '../../data/subjects.data';
import { SubjectModel } from '../../subjects/store/subjects.model';
import { selectSubjects } from '../../subjects/store/subjects.selectors';
import { Observable } from 'rxjs';
import { subjectsRequestedAction } from '../../subjects/store/subjects.actions';
import { SubjectsService } from '../../subjects/subjects.service';
import { regExValidator } from '../../validators/regex.validator';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { StudentModel } from '../store/students.model';

@Component({
  selector: 'app-studentsubject-list',
  templateUrl: './studentsubject-list.component.html',
  styleUrls: ['./studentsubject-list.component.css'],
})
export class StudentSubjectListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'semesters_s'];

  student: StudentModel;
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
            studentRequestedAction({ studentId: +params.get('studentId') })
          );
        })
      )
      .subscribe();

    this.store.pipe(select(selectLoadedStudent)).subscribe((student) => {
      if (student) {
        this.student = student;
      }
    });
    this.subjectList = [];
    console.log(this.student);
    this.student.subjectId.forEach((x) => {
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
