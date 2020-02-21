import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormTextInputComponent } from "./components/form-text-input/form-text-input.component";
import { FormPasswordInputComponent } from "./components/form-password-input/form-password-input.component";
import { FormInputErrorComponent } from "./components/form-input-error/form-input-error.component";
import { FormImageInputComponent } from "./components/form-image-input/form-image-input.component";
import { FormNumberInputComponent } from "./components/form-number-input/form-number-input.component";
import { FormTextAreaInputComponent } from "./components/form-text-area-input/form-text-area-input.component";

@NgModule({
  declarations: [
    FormTextInputComponent,
    FormPasswordInputComponent,
    FormInputErrorComponent,
    FormImageInputComponent,
    FormNumberInputComponent,
    FormTextAreaInputComponent
  ],
  imports: [CommonModule],
  exports: [
    FormTextInputComponent,
    FormPasswordInputComponent,
    FormInputErrorComponent,
    FormImageInputComponent,
    FormNumberInputComponent,
    FormTextAreaInputComponent
  ]
})
export class AppCommonModule {}
