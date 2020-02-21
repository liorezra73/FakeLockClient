import { AbstractControl } from "@angular/forms";

export const minAge_Validator = (
  formControl: AbstractControl,
  minAge: number
) => {
  if (formControl.value != "") {
    const now = new Date();
    const date = new Date(formControl.value);
    const oneDay = 1000 * 60 * 60 * 24;
    const differenceByMs = now.getTime() - date.getTime();
    let age = differenceByMs / oneDay / 365;
    if (age >= minAge) {
      return null;
    } else {
      return {
        minAge: true
      };
    }
  }
};
