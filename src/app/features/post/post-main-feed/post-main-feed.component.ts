import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/common/services/post-service.service";
import { IPostService } from "src/app/common/intefaces/post-service.inteface";
import { Post } from 'src/app/common/models/post';

@Component({
  selector: "app-post-main-feed",
  templateUrl: "./post-main-feed.component.html",
  styleUrls: ["./post-main-feed.component.css"]
})
export class PostMainFeedComponent implements OnInit {
  postService: IPostService;
  posts: Post[];
  constructor(service: PostService) {
    this.postService = service;
  }

  ngOnInit() {}

  getPost(){
    this.postService.getPostsOrderByDates();
  }
}
