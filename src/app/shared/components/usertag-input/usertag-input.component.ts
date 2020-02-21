import { Component, OnInit, forwardRef, Input, Injector } from "@angular/core";
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl
} from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { UserService } from "src/app/common/services/user.service";
import { IUserService } from "src/app/common/intefaces/user-service.inteface";
import { User } from "src/app/common/models/User";

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
  users$: Observable<User[]>;
  users: User[];
  ngControl: NgControl;
  userService: IUserService;

  constructor(private inj: Injector, userSerivce: UserService) {
    this.userService = userSerivce;
  }

  ngOnInit(): void {
    this.getUsers();
    this.ngControl = this.inj.get(NgControl);
  }

  getUsers() {
    this.users$ = this.userService.getUsers();
    this.users$.subscribe(users => {
      (this.users = users), console.log(this.users);
    });
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  onAddUserTag(userTag: HTMLInputElement) {
    
    if (/\S/.test(userTag.value)) {
      console.log(userTag.value)
      const usersTags = [...this.ngControl.value, { title: userTag.value }];
      console.log(usersTags)
      this.onModelChange(usersTags);
      userTag.value = null;
    } else {
      alert("cant be empty");
    }
  }
  onDeleteUserTagged(index: number) {
    const { value } = this.ngControl;
    const userTags = value.filter(t => value.indexOf(t) !== index);
    this.onModelChange(userTags);
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.users.slice(0, 10))
  )

  formatter = (user: User) =>
   user.username;

}
