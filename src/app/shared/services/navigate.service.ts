import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { INavigateService } from "../interfaces/navigate.service.interface";

@Injectable({
  providedIn: "root"
})
export class NavigateService implements INavigateService {
  constructor(private router: Router) {}

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
