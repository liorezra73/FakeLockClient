import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { MapsAPILoader } from "@agm/core";
import { INavigateService } from "src/app/shared/interfaces/navigate.service.interface";
import { NavigateService } from "src/app/shared/services/navigate.service";

@Component({
  selector: "app-user-home-page",
  templateUrl: "./user-home-page.component.html",
  styleUrls: ["./user-home-page.component.css"]
})
export class UserHomePageComponent implements OnInit {
  navigateService: INavigateService;
  constructor(navigateService: NavigateService) {
    this.navigateService = navigateService;
  }

  ngOnInit() {}

  onGoLoginPage() {
    console.log("dsada");
    this.navigateService.navigate("/home/login");
  }
  onGoRegisterPage() {
    this.navigateService.navigate("/home/register");
  }
}
