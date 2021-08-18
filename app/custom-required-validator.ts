import { ValidatorFn, AbstractControl } from "@angular/forms";

export function CustomRequiredValidator(extraColumnControl: AbstractControl): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {

    if (extraColumnControl.value && (control.value == null || control.value == "") ) {
      return { required: true };
    }


    return null;

  };

}