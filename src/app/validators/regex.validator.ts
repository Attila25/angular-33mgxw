import { AbstractControl, ValidatorFn } from '@angular/forms';

export function regExValidator(regEx: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valid = regEx.test(control.value);
    return valid ? null : {'regEx': {value: control.value}};
  };
}