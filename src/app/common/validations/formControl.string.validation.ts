import { Validators } from "@angular/forms";

export const stringValidation = (min: number, max: number) =>
  Validators.compose([
    Validators.minLength(min),
    Validators.maxLength(max),
    Validators.required
  ]);
