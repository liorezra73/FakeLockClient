import { Injectable, Inject } from "@angular/core";
import { IUserService } from "../intefaces/user-service.inteface";
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG } from "./config.service";
import { User } from "../models/User";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService implements IUserService {
  usersUrl: string;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) config: any) {
    this.usersUrl = `${config.baseApiURL}/users`;
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(map(data => data.map(res => this.dataPipe(res))));
  }

  onRegister(register: import("../models/Register").Register): void {
    throw new Error("Method not implemented.");
  }

  private dataPipe(i): User {
    return {
      id: i.Id,
      username: i.Username
    };
  }
}
