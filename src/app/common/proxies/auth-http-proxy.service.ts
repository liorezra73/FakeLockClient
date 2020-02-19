import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, ObservableInput } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthHttpProxyService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    const token = localStorage.getItem("token");
    this.headers = new HttpHeaders().set("x-auth-token", token);
  }

  get<T>(url: string) {
    return this.http
      .get<T>(url, { headers: this.headers })
      .pipe(catchError(this.handelErrors));
  }

  delete(url: string) {
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.handelErrors));
  }
  post<T>(url: string, data: T) {
    return this.http
      .post(url, data, { headers: this.headers })
      .pipe(catchError(this.handelErrors));
  }

  handelErrors(err: any, caught: Observable<any>): ObservableInput<any> {
    throw err;
  }
}
