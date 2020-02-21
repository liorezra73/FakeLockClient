import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl
} from "@angular/forms";
import { Register } from "src/app/common/models/Register";
import { stringValidation } from "src/app/common/validations/formControl.string.validation";
import { MustMatch } from "src/app/common/validations/formGroup.mustMatch.validation";
import { formControlTouchOrDirty } from "src/app/common/validations/formControlTouchOrDirty";
import { minAge_Validator } from "src/app/common/validations/formControl.date.validation";
import { IUserService } from "src/app/common/intefaces/user-service.inteface";
import { UserService } from "src/app/common/services/user.service";
import { INavigateService } from "src/app/shared/interfaces/navigate.service.interface";
import { NavigateService } from "src/app/shared/services/navigate.service";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"]
})
export class UserFormComponent implements OnInit {
  register: Register;
  registerForm: FormGroup;
  userService: IUserService;
  navigateService: INavigateService;
  constructor(userService: UserService, navigateService: NavigateService) {
    this.userService = userService;
    this.navigateService = navigateService;
  }

  ngOnInit() {
    this.initializeRegister();
    this.initializeRegisterForm();
  }

  initializeRegister() {
    this.register = {
      fullName: "",
      username: "",
      password: "",
      repeatPassword: "",
      birthDate: null,
      address: "",
      jobAddress: ""
    };
  }
  initializeRegisterForm() {
    this.registerForm = new FormGroup(
      {
        fullName: new FormControl(
          this.register.fullName,
          stringValidation(3, 100)
        ),
        username: new FormControl(
          this.register.username,
          stringValidation(3, 200)
        ),
        password: new FormControl(
          this.register.password,
          (stringValidation(3, 1024), [Validators.required])
        ),
        repeatPassword: new FormControl(
          this.register.repeatPassword,
          stringValidation(3, 1024)
        ),
        address: new FormControl(
          this.register.address,
          stringValidation(3, 200)
        ),
        jobAddress: new FormControl(
          this.register.jobAddress,
          stringValidation(3, 200)
        ),
        birthDate: new FormControl(
          this.register.birthDate,
          Validators.compose([Validators.required, this.minAge_Validate])
        )
      },
      { validators: this.passwordMatch_Validate }
    );
  }
  passwordMatch_Validate(formGroup: FormGroup) {
    return MustMatch(
      formGroup.get("password"),
      formGroup.get("repeatPassword")
    );
  }
  minAge_Validate(formControl: FormControl) {
    return minAge_Validator(formControl, 18);
  }

  formControlTouchOrDirty(formControl: AbstractControl) {
    return formControlTouchOrDirty(formControl);
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.register = this.registerForm.value;
      this.userService.onRegister(this.register).subscribe(
        res => {
          this.initializeRegister();
          this.initializeRegisterForm();
          this.navigateService.navigate("./home/login");
        },
        err => {
          switch (err.status) {
            case 400:
              alert("form not valid!");
            case 409:
              this.registerForm.get("username").setErrors({'usernameExists':true});
              break;
            case 500:
              alert("something went wrong! try again later");
          }
        }
      );
    } else {
      alert("form not valid");
    }
    console.log(this.register);
    console.log(this.registerForm.errors);
  }
}
