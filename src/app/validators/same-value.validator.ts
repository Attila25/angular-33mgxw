import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

export const sameValueValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const name = control.get('name');
  const description = control.get('description');

  return name && description && name.value === description.value ? { 'sameValue': true } : null;
};