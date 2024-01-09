import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function ValidatePassword(controlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];

        if (control.errors && (!control.errors.invalid || !control.errors.minlength)) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        let errCount = 0
        // set error on matchingControl if validation fails
        if (control.value) {
            if (!(/[a-z]/.test(control.value))) {
                errCount++;
            }
            if (!(/[A-Z]/.test(control.value))) {
                errCount++;
            }
            if (!(/[0-9]/.test(control.value))) {
                errCount++;
            }
            var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            if (!(format.test(control.value))) {
                errCount++;
            }
            if (errCount > 1) {
                control.setErrors({ invalid: true });
            }
        }
    }
}