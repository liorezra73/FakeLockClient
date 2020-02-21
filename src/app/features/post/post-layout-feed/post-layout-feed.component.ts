import { Component, OnInit } from "@angular/core";
import { INavigateService } from "src/app/shared/interfaces/navigate.service.interface";
import { NavigateService } from "src/app/shared/services/navigate.service";

@Component({
  selector: "app-post-layout-feed",
  templateUrl: "./post-layout-feed.component.html",
  styleUrls: ["./post-layout-feed.component.css"]
})
export class PostLayoutFeedComponent implements OnInit {
  navigateService: INavigateService;
  constructor(navigateService: NavigateService) {
    this.navigateService = navigateService;
  }

  ngOnInit() {}

  onGoMapFeed() {
    this.navigateService.navigate("/posts/feed/map");
  }
  onGoMainFeed() {
    this.navigateService.navigate("/posts/feed/main");
  }
}
