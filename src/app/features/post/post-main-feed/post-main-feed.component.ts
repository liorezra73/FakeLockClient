import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/common/services/post-service.service";
import { IPostService } from "src/app/common/intefaces/post-service.inteface";
import { Post } from "src/app/common/models/post";
import { Router } from "@angular/router";

@Component({
  selector: "app-post-main-feed",
  templateUrl: "./post-main-feed.component.html",
  styleUrls: ["./post-main-feed.component.css"]
})
export class PostMainFeedComponent implements OnInit {
  postService: IPostService;
  posts: Post[];
  constructor(service: PostService, private router: Router) {
    this.postService = service;
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPostsOrderByDates().subscribe(
      posts => (this.posts = posts),
      err => this.handleError(err)
    );
  }

  onPostSelect(postId: number) {
    this.router.navigate(["/posts",postId]);
  }

  handleError(error): void {
    switch (error.status) {
      case 0:
        alert("Connection error!  Redirect to home page.");
        this.navigateHomeByTimer(3000);
        break;
      case 404:
        alert("No posts to display, please try again.");
        break;
      case 500:
        alert("Connection error! please try again.");
      default:
        alert("Connection error! Redirect to home page");
        this.navigateHomeByTimer(3000);
        break;
    }
  }

  navigateHomeByTimer(time: number): void {
    setTimeout(() => {
      this.router.navigate(["home"]);
    }, time);
  }
}
