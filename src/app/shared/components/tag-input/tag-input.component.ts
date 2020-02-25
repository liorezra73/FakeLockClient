import { Component, OnInit, forwardRef, Input, Injector } from "@angular/core";
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl
} from "@angular/forms";

@Component({
  selector: "app-tag-input",
  templateUrl: "./tag-input.component.html",
  styleUrls: ["./tag-input.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagInputComponent),
      multi: true
    }
  ]
})
export class TagInputComponent implements ControlValueAccessor, OnInit {
  onModelChange: Function = (value: any) => {};
  onModelTouched: Function = () => {};
  @Input() label: string;
  @Input() placeholder: string;
  ngControl: NgControl;

  constructor(private inj: Injector) {}

  ngOnInit(): void {
    this.ngControl = this.inj.get(NgControl);
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  onAddTag(tag: HTMLInputElement) {
    if (/\S/.test(tag.value)) {
      const tags = [...this.ngControl.value, { title: tag.value }];
      if (tags.length <= 3) {
        this.onModelChange(tags);
        tag.value = null;
      }
    } else {
      alert("cant be empty");
    }
  }
  onDeleteTag(index: number) {
    const { value } = this.ngControl;
    const tags = value.filter(t => value.indexOf(t) !== index);
    this.onModelChange(tags);
  }
}
