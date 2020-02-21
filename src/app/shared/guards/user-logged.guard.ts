import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthService } from 'src/app/common/intefaces/auth-service.interface';
import { INavigateService } from '../interfaces/navigate.service.interface';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { NavigateService } from '../services/navigate.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedGuard implements CanActivate {
  authService: IAuthService;
  navigateService: INavigateService;
  constructor(
    authService: AuthenticationService,
    navigateService: NavigateService
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
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     const res = this.authService.isLoggedIn();
     console.log(res)
    if (res) {
      return this.defaultNavigation("/posts");
    } else {
      true;
    }
  }
  
}
