import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { regExValidator } from '../validators/regex.validator';
import { sameValueValidator } from '../validators/same-value.validator';
import { EventNameValidator } from '../validators/event-name.validator';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  eventForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private eventService: EventService,
              private eventNameValidator: EventNameValidator,
              private router: Router) { }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      'name': ['', { validators: [Validators.required, Validators.maxLength(50)], asyncValidators: this.eventNameValidator.eventNameValidatorFn(), updateOn: 'change'}],
      'start': ['', [Validators.required,
        regExValidator(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/i)]],
      'description': ['', [Validators.required, Validators.maxLength(100)]]
    }, {validators: sameValueValidator});
  }

  onSubmit(eventData) {
    alert('Form submitted:\n' + JSON.stringify(eventData));
    this.eventService.createEvent(eventData).subscribe(res => {
      this.eventForm.reset();
      this.router.navigate(['/events']);
    });
  }

  get name() { return this.eventForm.get('name'); }
  get description() { return this.eventForm.get('description'); }
  get start() { return this.eventForm.get('start'); }

  getNameErrorMessage() {
    if (this.name.dirty || this.name.touched) {
      if (this.name.hasError('required')) return 'You must enter a value!';
      if (this.name.hasError('maxlength')) return 'You can enter at most 50 characters!';
    }
    return '';
  }

  getDescriptionErrorMessage() {
    if (this.description.dirty || this.description.touched) {
      if (this.description.hasError('required')) return 'You must enter a value!';
      if (this.description.hasError('maxlength')) return 'You can enter at most 100 characters!';
    }
    return '';
  }

  getStartErrorMessage() {
    if (this.start.dirty || this.start.touched) {
      if (this.start.hasError('required')) return 'You must enter a value!';
      if (this.start.hasError('regEx')) return 'You must enter a valid date time!';
    }
    return '';
  }

}
