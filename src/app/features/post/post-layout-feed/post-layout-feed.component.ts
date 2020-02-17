import { Component, OnInit } from "@angular/core";
import {
  PostService
} from "src/app/common/services/post-service.service";
import { IPostService } from 'src/app/common/intefaces/post-service.inteface';

@Component({
  selector: "app-post-layout-feed",
  templateUrl: "./post-layout-feed.component.html",
  styleUrls: ["./post-layout-feed.component.css"]
})
export class PostLayoutFeedComponent implements OnInit {
  service: IPostService;
  constructor(service: PostService) {
    this.service = service;
  }

  ngOnInit() {}
}
