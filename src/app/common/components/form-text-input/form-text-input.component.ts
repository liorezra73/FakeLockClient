import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  forwardRef
} from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-form-text-input",
  templateUrl: "./form-text-input.component.html",
  styleUrls: ["./form-text-input.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTextInputComponent),
      multi: true
    }
  ]
})
export class FormTextInputComponent implements ControlValueAccessor {
  onModelChange: Function = (value: any) => {};
  onModelTouched: Function = () => {};
  @Input() placeholder: string;
  @Input() label: string;
  @Input() errors: any[];
  value = null;

  constructor() {
    console.log(this.errors)
  }

  writeValue(value: string) {
    this.value = value;
    console.log('written value');
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onModelTouched = fn;
  }
}
