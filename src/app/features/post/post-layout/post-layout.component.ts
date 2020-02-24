import { Component, OnInit } from "@angular/core";
import { IAuthService } from "src/app/common/intefaces/auth-service.interface";
import { AuthenticationService } from "src/app/common/services/authentication.service";
import { INavigateService } from "src/app/shared/interfaces/navigate.service.interface";
import { NavigateService } from "src/app/shared/services/navigate.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-post-layout",
  templateUrl: "./post-layout.component.html",
  styleUrls: ["./post-layout.component.css"]
})
export class PostLayoutComponent implements OnInit {
  authService: IAuthService;
  navigateService: INavigateService;
  constructor(
    authService: AuthenticationService,
    private toastr: ToastrService,
    navigateService: NavigateService
  ) {
    this.authService = authService;
    this.navigateService = navigateService;
  }

  ngOnInit() {}
  onaskLogout() {
    this.logout();
  }
  logout() {
    this.authService.onLogout();
    this.navigateService.navigate("/home");
  }
  onGoPostForm() {
    this.navigateService.navigate("/posts/form");
  }
  onGoFeed() {
    this.navigateService.navigate("/posts/feed/main");
  }
}
