import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormTextInputComponent } from "./components/form-text-input/form-text-input.component";
import { FormPasswordInputComponent } from './components/form-password-input/form-password-input.component';
import { FormInputErrorComponent } from './components/form-input-error/form-input-error.component';

@NgModule({
  declarations: [FormTextInputComponent, FormPasswordInputComponent,FormInputErrorComponent],
  imports: [CommonModule],
  exports: [FormTextInputComponent, FormPasswordInputComponent,FormInputErrorComponent]
})
export class AppCommonModule {}
