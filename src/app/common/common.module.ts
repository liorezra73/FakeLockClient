import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormTextInputComponent } from "./components/form-text-input/form-text-input.component";
import { FormPasswordInputComponent } from './components/form-password-input/form-password-input.component';

@NgModule({
  declarations: [FormTextInputComponent, FormPasswordInputComponent],
  imports: [CommonModule],
  exports: [FormTextInputComponent, FormPasswordInputComponent]
})
export class AppCommonModule {}
