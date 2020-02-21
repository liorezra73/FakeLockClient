import { Injectable, Inject } from "@angular/core";
import { APP_CONFIG } from "./config.service";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Login } from "../models/Login";
import { IAuthService } from "../intefaces/auth-service.interface";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService implements IAuthService {
  authUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) config: any,
    private router: Router
  ) {
    this.authUrl = `${config.baseApiURL}/auth`;
  }
  onLogin(login: Login): Observable<string> {
    return this.http.post<string>(this.authUrl, login);
  }

  saveToken(token: string): boolean {
    if (token.length > 0) {
      localStorage.setItem("token", token);
      return true;
    } else {
      return false;
    }
  }

  onLogout(): void {
    localStorage.removeItem("token");
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
  }
}
