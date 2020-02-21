import { Observable } from "rxjs";
import { Login } from "../models/Login";

export interface IAuthService {
  authUrl: string;
  onLogin(login: Login): Observable<string>;
  onLogout(): void;
  isLoggedIn(): boolean;
  saveToken(token: string): boolean;
}
