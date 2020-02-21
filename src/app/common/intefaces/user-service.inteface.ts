import { Observable } from "rxjs";
import { User } from "../models/User";
import { Register } from "../models/Register";

export interface IUserService {
  usersUrl: string;
  getUsersByUsername(username: string): Observable<User[]>;
  onRegister(register: Register): Observable<number>;
}
