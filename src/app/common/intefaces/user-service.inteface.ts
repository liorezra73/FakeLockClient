import { Observable } from "rxjs";
import { User } from "../models/User";
import { Login } from "../models/Login";
import { Register } from "../models/Register";

export interface IUserService {
  usersUrl: string;
  getUsers(): Observable<User[]>;
  onLogin(login: Login): void;
  onLogout(): void;
  onRegister(register: Register): void;
  checkIfLogged(): boolean;
}
