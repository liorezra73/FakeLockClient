import { Component, OnInit, forwardRef, Input, Injector } from "@angular/core";
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl
} from "@angular/forms";

@Component({
  selector: "app-usertag-input",
  templateUrl: "./usertag-input.component.html",
  styleUrls: ["./usertag-input.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsertagInputComponent),
      multi: true
    }
  ]
})
export class UsertagInputComponent implements ControlValueAccessor, OnInit {
  onModelChange: Function = (value: any) => {};
  onModelTouched: Function = () => {};
  @Input() label: string;
  @Input() placeholder: string;
  ngControl: NgControl;

  users = [
    { username: "kkk" },
    { username: "ddd" },
    { username: "uuu" },
    { username: "ttt" },
    { username: "udasduu" },
    { username: "dasdvcx" },
    { username: "ioik7" }
  ];
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

  onSearch(event: any) {
    let { value } = event.target;
    if (/\S/.test(value) && value.length > 2) {
    
      value = null;
    } else {
      alert("cant be empty");
    }
  }
  onAddUserTag(userTag:HTMLInputElement){
    if (/\S/.test(userTag.value)) {
      const tags = [...this.ngControl.value, { title: userTag.value }];
      this.onModelChange(tags);
      userTag.value = null;
    } else {
      alert("cant be empty");
    }
  }
  onDeleteTagged(index: number) {
    const { value } = this.ngControl;
    const tags = value.filter(t => value.indexOf(t) !== index);
    this.onModelChange(tags);
  }
}
