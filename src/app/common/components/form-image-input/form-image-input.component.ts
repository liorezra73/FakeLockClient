import { Component, OnInit, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "app-form-image-input",
  templateUrl: "./form-image-input.component.html",
  styleUrls: ["./form-image-input.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormImageInputComponent),
      multi: true
    }
  ]
})
export class FormImageInputComponent implements ControlValueAccessor {
  onModelChange: Function = (value: any) => {};
  onModelTouched: Function = () => {};
  @Input() label: string;

  constructor() {}

  writeValue(obj: File): void {
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }
  onPhotoChanged(event) {
    const value = (event.target as HTMLInputElement).files[0];
    this.onModelChange(value);
  }
}
