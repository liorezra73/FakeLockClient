import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormTextInputComponent } from "./components/form-text-input/form-text-input.component";

@NgModule({
  declarations: [FormTextInputComponent],
  imports: [CommonModule],
  exports: [FormTextInputComponent]
})
export class AppCommonModule {}
