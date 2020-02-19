import { Observable } from "rxjs";
import { User } from "../models/User";
import { Login } from "../models/Login";
import { Register } from "../models/Register";

export interface IUserService {
  usersUrl: string;
  getUsers(): Observable<User[]>;
  onRegister(register: Register): void;
}
