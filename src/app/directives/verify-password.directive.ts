import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';
import { CustomvalidationService } from '../services/customvalidation.service';

@Directive({
  selector: '[appMatchPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: VerifyPasswordDirective, multi: true }]
})
export class VerifyPasswordDirective implements Validator {
  @Input('appVerifyPassword') VerifyPassword: string[] = [];

  constructor(private customValidator: CustomvalidationService) { }

  validate(formGroup: FormGroup): ValidationErrors {
    return this.customValidator.VerifyPassword(this.VerifyPassword[0], this.VerifyPassword[1])(formGroup);
  }
}


