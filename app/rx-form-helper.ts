import { FormArray, FormGroup } from "@angular/forms";

export function UpdateFormArrayValidity(formArray: FormArray) {
  formArray.controls.forEach((formGroup: FormGroup) => {
    for (let key in formGroup.controls) {
      formGroup.controls[key].updateValueAndValidity();
    }
  });
}