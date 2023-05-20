import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<mat-card>
    <h2>Hello {{name}}!</h2>
    <nav>
      <ul>
        <li><a mat-button routerLink="/events">
            <b>Events</b>
          </a></li>
           <li><a mat-button routerLink="/books">
            <b>Books</b>
          </a></li>
          <li><a mat-button routerLink="/authors">
            <b>Authors</b>
          </a></li>
          <li><a mat-button routerLink="/teachers">
            <b>Teachers</b>
          </a></li>
          <li><a mat-button routerLink="/subjects">
            <b>Subjects</b>
          </a></li>
          <li><a mat-button routerLink="/students">
            <b>Students</b>
          </a></li>
          <li><a mat-button routerLink="/semesters">
            <b>Semesters</b>
          </a></li>
          <li><a mat-button routerLink="/login">
            <b>Login</b>
          </a></li>
      </ul>
    </nav>
  </mat-card>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent {
  @Input() name: string;
}
