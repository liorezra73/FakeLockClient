import { AbstractControl } from "@angular/forms";

export const formControlTouchOrDirty = (formControl: AbstractControl):boolean => {
  console.log(formControl)
  return formControl.dirty || formControl.touched;
};
