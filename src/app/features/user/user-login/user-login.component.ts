import { Component, OnInit } from "@angular/core";
import { IAuthService } from "src/app/common/intefaces/auth-service.interface";
import { AuthenticationService } from "src/app/common/services/authentication.service";
import { Login } from "src/app/common/models/Login";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { INavigateService } from "src/app/shared/interfaces/navigate.service.interface";
import { NavigateService } from "src/app/shared/services/navigate.service";
import { formControlTouchOrDirty } from "src/app/common/validations/formControlTouchOrDirty";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"]
})
export class UserLoginComponent implements OnInit {
  authService: IAuthService;
  navigateService: INavigateService;
  login: Login;
  loginForm: FormGroup;
  constructor(
    authenticationService: AuthenticationService,
    navigateService: NavigateService,
    private toastr: ToastrService
  ) {
    this.authService = authenticationService;
    this.navigateService = navigateService;
  }

  ngOnInit() {
    this.initializeLogin();
    this.initializeLoginForm();
  }

  initializeLogin() {
    this.login = {
      username: "",
      password: ""
    };
  }
  initializeLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(this.login.username, Validators.required),
      password: new FormControl(this.login.password, Validators.required)
    });
  }

  formControlTouchOrDirty(formControl: AbstractControl) {
    return formControlTouchOrDirty(formControl);
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.login = this.loginForm.value;
      this.authService.onLogin(this.login).subscribe(
        res => {
          const tokenSaved = this.authService.saveToken(res);
          if (tokenSaved) {
            this.navigateService.navigate("/posts");
            this.toastr.success("Logged in");
            this.initializeLogin();
            this.initializeLoginForm();
          } else {
            this.toastr.success("failed to log in");
          }
        },
        err => {
          if (err.status < 500) {
            this.toastr.error("username or password incorrect");
          } else {
            this.toastr.error("something went wrong!try again later...");
          }
        }
      );
    }
  }
  onGoRegisterPage() {
    this.navigateService.navigate("/home/register");
  }
}
