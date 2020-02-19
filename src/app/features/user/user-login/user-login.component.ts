import { Component, OnInit } from "@angular/core";
import { IAuthService } from "src/app/common/intefaces/auth-service.interface";
import { AuthenticationService } from "src/app/common/services/authentication.service";
import { Login } from "src/app/common/models/Login";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { stringValidation } from "src/app/common/validations/formControl.string.validation";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"]
})
export class UserLoginComponent implements OnInit {
  authService: IAuthService;
  login: Login;
  loginForm: FormGroup;
  constructor(authenticationService: AuthenticationService) {
    this.authService = authenticationService;
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

  onLogin(): void {
    if (this.loginForm.valid) {
      this.login = this.loginForm.value;
      const islogged = this.authService.onLogin(this.login);
      if (islogged) {
        this.initializeLogin();
        this.initializeLoginForm();
      }
    }
  }
}
