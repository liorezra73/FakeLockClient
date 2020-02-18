import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormTextInputComponent } from "./components/form-text-input/form-text-input.component";
<<<<<<< HEAD
import { FormPasswordInputComponent } from './components/form-password-input/form-password-input.component';

@NgModule({
  declarations: [FormTextInputComponent, FormPasswordInputComponent],
  imports: [CommonModule],
  exports: [FormTextInputComponent, FormPasswordInputComponent]
=======
import { FormInputErrorComponent } from './components/form-input-error/form-input-error.component';

@NgModule({
  declarations: [FormTextInputComponent, FormInputErrorComponent],
  imports: [CommonModule],
  exports: [FormTextInputComponent,FormInputErrorComponent]
>>>>>>> formTextInputFix
})
export class AppCommonModule {}
