import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { User } from "src/app/common/models/User";
import { Register } from "src/app/common/models/Register";
import { stringValidation } from "src/app/common/validations/formControl.string.validation";
import { MustMatch } from "src/app/common/validations/formGroup.mustMatch.validation";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"]
})
export class UserFormComponent implements OnInit {
  register: Register;
  registerForm: FormGroup;
  constructor() {}

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
          stringValidation(3, 200)
        ),
        username: new FormControl(
          this.register.username,
          stringValidation(3, 200)
        ),
        password: new FormControl(
          this.register.password,
          stringValidation(3, 200)
        ),
        repeatPassword: new FormControl(
          this.register.repeatPassword,
          stringValidation(3, 200)
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
          this.register.jobAddress,
          Validators.required
        )
      }
      
    );
  }
  // { validator: MustMatch("password", "repeatPassword") }

  onRegister() {
    console.log(this.registerForm.value)
  }
}
