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
import { INavigateService } from "../interfaces/navigate.service.interface";
import { NavigateService } from "../services/navigate.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  authService: IAuthService;
  navigateService: INavigateService;
  constructor(
    authService: AuthenticationService,
    navigateService: NavigateService,
    private router: Router
  ) {
    this.authService = authService;
    this.navigateService = navigateService;
  }

  defaultNavigation(route: string) {
    this.navigateService.navigate(route);
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
      if (next.url[0].path.startsWith("home")) {
        return true;
      } else {
        return this.router.createUrlTree(["/home/login"]);
      }
    } else {
      if (next.url[0].path.startsWith("home")) {
        return this.router.createUrlTree(["/posts"]);
      } else {
        return true;
      }
    }
  }
}
