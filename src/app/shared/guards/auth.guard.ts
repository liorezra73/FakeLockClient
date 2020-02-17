import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { IAuthService } from "src/app/common/intefaces/auth-service.interface";
import { AuthenticationService } from "src/app/common/services/authentication.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  authService: IAuthService;
  constructor(private router: Router, authService: AuthenticationService) {
    this.authService = authService;
  }

  defaultNavigation(route: string) {
    this.router.navigate([route]);
    return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const res = this.authService.isLoggedIn();
    if (!res) {
      return this.defaultNavigation("/home/login");
    } else {
      return true;
    }
  }
}
