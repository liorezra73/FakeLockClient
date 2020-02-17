import { Component, OnInit } from "@angular/core";
import { IAuthService } from "src/app/common/intefaces/auth-service.interface";
import { AuthenticationService } from "src/app/common/services/authentication.service";

@Component({
  selector: "app-post-layout",
  templateUrl: "./post-layout.component.html",
  styleUrls: ["./post-layout.component.css"]
})
export class PostLayoutComponent implements OnInit {
  x: IAuthService;
  constructor(x: AuthenticationService) {
    this.x = x;
  }

  ngOnInit() {
    console.log(this.x.isLoggedIn());
  }
  logout() {
    this.x.onLogout();
  }
}
