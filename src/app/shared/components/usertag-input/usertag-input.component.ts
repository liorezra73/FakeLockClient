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
  taggedUsers: User[] = [];
  taggedUser: User;
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

  onAddUserTag(userTag: HTMLInputElement) {
    if (/\S/.test(userTag.value)) {
      const usersTags = [...this.ngControl.value, this.taggedUser.username];
      this.taggedUsers.push(this.taggedUser);
      console.log(this.taggedUsers);
      this.onModelChange(this.taggedUsers);
      userTag.value = null;
    } else {
      alert("cant be empty");
    }
  }

  onDeleteUserTagged(index: number) {
    this.taggedUsers = this.taggedUsers.filter(
      t => this.taggedUsers.indexOf(t) !== index
    );
    console.log(this.taggedUsers);
    this.onModelChange(this.taggedUsers);
  }

  getPostsByName(name): User[] {
   this.userService.getUsersByUsername(name).subscribe(users => this.users = users, null, ()=>{return this.users})
   console.log(this.users);
   return this.users
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => (term.length < 2 ? [] : this.getPostsByName(term)))
    );

  formatter = (user: User) => user.username;

  onSelectUser(user) {
    this.taggedUser = user.item as User;
  }
}
