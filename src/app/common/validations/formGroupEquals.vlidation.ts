import { Validator } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector: '[formGroupEquals]'
})
export class formGroupEquals implements Validator{
    validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
        throw new Error("Method not implemented.");
    }    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }


}