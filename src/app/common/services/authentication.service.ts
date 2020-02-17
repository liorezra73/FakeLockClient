import { Injectable, Inject } from "@angular/core";
import { APP_CONFIG } from "./config.service";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Login } from "../models/Login";
import { IAuthService } from "../intefaces/auth-service.interface";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

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
  onLogin(login: Login): boolean {
    this.http.post(this.authUrl, login).subscribe(
      res => {
        localStorage.setItem("token", res.toString());
        this.router.navigate(["/posts"]);
        return true;
      },
      err => {
        if (err.status < 500) {
          alert("username/password incorrect!");
        } else {
          alert("feild to login!");
        }
        return false;
      }
    );
    return false;
  }

  onLogout(): void {
    localStorage.removeItem("token");
    this.router.navigate(["/home/login"]);
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
  }
}
