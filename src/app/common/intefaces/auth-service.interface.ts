import { Observable } from "rxjs";
import { Login } from "../models/Login";

export interface IAuthService {
  authUrl: string;
  onLogin(login: Login): boolean; //Observable<any>;
  onLogout(): void;
  isLoggedIn(): boolean;
}
