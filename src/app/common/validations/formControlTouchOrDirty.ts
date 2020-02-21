import { AbstractControl } from "@angular/forms";

export const formControlTouchOrDirty = (formControl: AbstractControl):boolean => {
  return formControl.dirty || formControl.touched;
};
