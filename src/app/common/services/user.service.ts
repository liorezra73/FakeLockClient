import { Injectable, Inject } from "@angular/core";
import { IUserService } from "../intefaces/user-service.inteface";
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG } from "./config.service";
import { User } from "../models/User";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Register } from "../models/Register";
import { AuthHttpProxyService } from "../proxies/auth-http-proxy.service";

@Injectable({
  providedIn: "root"
})
export class UserService implements IUserService {
  usersUrl: string;

  constructor(
    private authhttp: AuthHttpProxyService,
    private http: HttpClient,
    @Inject(APP_CONFIG) config: any
  ) {
    this.usersUrl = `${config.baseApiURL}/users`;
  }

  getUsersByUsername(username: string): Observable<User[]> {
    return this.authhttp
      .get<User[]>(`${this.usersUrl}?username=${username}`)
      .pipe(map(data => data.map(res => this.dataPipe(res))));
  }

  onRegister(register: Register): Observable<number> {
    return this.http.post<number>(this.usersUrl, register);
  }

  private dataPipe(i): User {
    return {
      id: i.Id,
      username: i.Username
    };
  }
}
