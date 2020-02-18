import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormTextInputComponent } from "./components/form-text-input/form-text-input.component";
import { FormPasswordInputComponent } from "./components/form-password-input/form-password-input.component";
import { FormInputErrorComponent } from "./components/form-input-error/form-input-error.component";
import { FormImageInputComponent } from "./components/form-image-input/form-image-input.component";

@NgModule({
  declarations: [
    FormTextInputComponent,
    FormPasswordInputComponent,
    FormInputErrorComponent,
    FormImageInputComponent
  ],
  imports: [CommonModule],
  exports: [
    FormTextInputComponent,
    FormPasswordInputComponent,
    FormInputErrorComponent,
    FormImageInputComponent
  ]
})
export class AppCommonModule {}
