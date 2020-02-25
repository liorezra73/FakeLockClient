import { Component, OnInit, forwardRef, Input, Injector } from "@angular/core";
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl
} from "@angular/forms";
import { Observable, of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  catchError
} from "rxjs/operators";
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
  users: User[] = [];
  taggedUsers: User[] = [];
  taggedUser: string = "";
  ngControl: NgControl;
  userService: IUserService;
  tempArr: any[] = [{ username: "kfc" }, { username: "kf" }];

  constructor(private inj: Injector, userSerivce: UserService) {
    this.userService = userSerivce;
  }

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

  onDeleteUserTagged(index: number) {
    this.taggedUsers = this.taggedUsers.filter(
      t => this.taggedUsers.indexOf(t) !== index
    );
    this.onModelChange(this.taggedUsers);
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(term => {
        return this.userService.getUsersByUsername(term).pipe(
          catchError(() => {
            return of([]);
          }),
          map(users =>
            users.filter(user => !this.taggedUsers.find(u => u.id === user.id))
          )
        );
      })
    );
  };

  formatter = (user: User) => user.username;

  onSelectUser(user) {
    console.log("onSelect", this.taggedUsers.length);
    if (this.taggedUsers.length < 3) {
      this.taggedUsers.push(user.item);
      this.onModelChange(this.taggedUsers);
      this.taggedUser = "";
    }
  }
}
