import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Md5 } from "ts-md5";

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl) return null;
      if (!confirmPasswordControl) return null;

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if ( (!passwordControl.value && confirmPasswordControl.value === '')
        || (passwordControl.value === '' && !confirmPasswordControl.value) ){
        confirmPasswordControl.setErrors(null);
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value){
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  VerifyPassword(password: string, passwordHash: string){
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const hashPasswordControl = formGroup.controls[passwordHash];

      if (!passwordControl || !hashPasswordControl) {
        return null;
      }

      if (passwordControl.value == null) return null;

      const passHash = Md5.hashStr(passwordControl.value.trim().toLowerCase());
      if (passHash !== hashPasswordControl.value  ) {
        passwordControl.setErrors({ passwordMismatch: true });
      } else {
        passwordControl.setErrors(null);
      }
    }
  }

  userNameValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateUserName(userName: string) {
    const UserList = ['ankit', 'admin', 'user', 'superuser'];
    return (UserList.indexOf(userName) > -1);
  }
}
