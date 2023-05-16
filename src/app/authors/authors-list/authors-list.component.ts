import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthorsService } from '../authors.service';
import { AuthorModel } from '../store/authors.model';
import { selectAuthors } from '../store/authors.selectors';
import { authorsRequestedAction, authorDeleteAction } from '../store/authors.actions';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'birthYear', 'nationality', 'actions'];

  authors$: Observable<AuthorModel[]> = this.store.pipe(select(selectAuthors));

  constructor(private authorsService: AuthorsService,
              private store: Store) { }

  ngOnInit() {
    this.store.dispatch(authorsRequestedAction());
  }

  onDelete(author: AuthorModel): void {
    this.store.dispatch(authorDeleteAction({author}));
  }

}