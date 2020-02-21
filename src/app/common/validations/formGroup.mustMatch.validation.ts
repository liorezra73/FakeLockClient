import { FormGroup, AbstractControl } from "@angular/forms";

// custom validator to check that two fields match
export const MustMatch = (
  control: AbstractControl,
  matchingControl: AbstractControl
) => {
 
  if (control && matchingControl) {
    if (control.value !== matchingControl.value) {
      return { noEqual: true };
    } else {
      return null;
    }
  }
  else {
    return null
  }
};
