import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/common/models/post";
import { Router } from "@angular/router";
import { IPostService } from "src/app/common/intefaces/post-service.inteface";
import { PostService } from "src/app/common/services/post-service.service";
import { OrderBy } from "src/app/common/enums/orderBy";
import { NavigateService } from "src/app/shared/services/navigate.service";
import { INavigateService } from "src/app/shared/interfaces/navigate.service.interface";

@Component({
  selector: "app-post-main-feed",
  templateUrl: "./post-main-feed.component.html",
  styleUrls: ["./post-main-feed.component.css"]
})
export class PostMainFeedComponent implements OnInit {
  postService: IPostService;
  navgiateService: INavigateService;
  posts: Post[];
  constructor(postService: PostService, navigateService: NavigateService) {
    this.postService = postService;
    this.navgiateService = navigateService;
    this._getPosts();
  }

  ngOnInit() {}

  private _getPosts(): void {
    this.postService.filterPosts(null, null);
    this.postService.posts$.subscribe(
      posts => {
        this.posts = posts;
      },
      err => this.handleError(err)
    );
  }

  onPostSelect(postId: number) {
    this.navgiateService.navigate(`/posts/${postId}`);
  }

  handleError(error): void {
    switch (error.status) {
      case 0:
        alert("Connection error!  Redirect to home page.");
        break;
      case 404:
        alert("No posts to display, please try again.");
        break;
      case 500:
        alert("Connection error! please try again.");
      default:
        alert("Connection error! Redirect to home page");
        break;
    }
  }
}
