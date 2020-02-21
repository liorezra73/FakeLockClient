import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
  HttpParams
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Observable, ObservableInput } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthHttpProxyService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.setHeaders();
  }

  setHeaders() {
    const token = localStorage.getItem("token");
    if (token) {
      this.headers = new HttpHeaders().set("x-auth-token", token);
    } else {
      this.headers.delete("x-auth-token");
    }
  }

  get<T>(url: string) {
    this.setHeaders();
    return this.http
      .get<T>(url, {
        headers: this.headers.get("x-auth-token") ? this.headers : null
      })
      .pipe(catchError(this.handelErrors));
  }

  delete(url: string) {
    this.setHeaders();
    return this.http
      .delete(url, {
        headers: this.headers.get("x-auth-token") ? this.headers : null
      })
      .pipe(catchError(this.handelErrors));
  }
  post<T>(url: string, data: T) {
    this.setHeaders();
    console.log(this.headers.get("x-auth-token"));
    return this.http
      .post(url, data, {
        headers: this.headers.get("x-auth-token") ? this.headers : null
      })
      .pipe(catchError(this.handelErrors));
  }

  handelErrors(err: any, caught: Observable<any>): ObservableInput<any> {
    console.log(err);
    throw err;
  }
}
