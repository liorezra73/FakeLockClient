import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, ObservableInput } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthHttpProxyService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {}

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders().set("x-auth-token", token);
  }

  get<T>(url: string) {
    return this.http
      .get<T>(url, { headers: this.getHeaders() })
      .pipe(catchError(this.handelErrors));
  }

  delete(url: string) {
    return this.http
      .delete(url, { headers: this.getHeaders() })
      .pipe(catchError(this.handelErrors));
  }
  post<T>(url: string, data: T) {
    return this.http
      .post(url, data, { headers: this.getHeaders() })
      .pipe(catchError(this.handelErrors));
  }

  handelErrors(err: any, caught: Observable<any>): ObservableInput<any> {
    throw err;
  }
}
