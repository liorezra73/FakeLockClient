import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/common/services/post-service.service";
import { IPostService } from "src/app/common/intefaces/post-service.inteface";
import { Router, ActivatedRoute } from "@angular/router";
import { Post } from "src/app/common/models/post";

@Component({
  selector: "app-post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {
  postId: number;
  post: Post;
  postService: IPostService;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    postService: PostService
  ) {
    this.postService = postService;
    this.activatedRoute.params.subscribe(
      res => (this.postId = parseInt(res.postId))
    );
  }

  ngOnInit() {
    this.getPostById(this.postId);
  }

  getPostById(postId: number) {
    this.postService
      .getPostById(postId)
      .subscribe(post => {this.post = post; console.log(this.post) }, err=> this.handleError(err));
  }

  handleError(error): void {
    switch (error.status) {
      case 0:
        alert("Connection error! Redirect to main page.");
        this.navigateMainByTimer(3000);
        break;
      case 404:
        alert("No post found! Redirect to main page. ");
        this.navigateMainByTimer(2000);
        break;
      case 500:
        alert("Connection error! please try again later.");
      default:
        alert("Connection error! Redirect to main page");
        this.navigateMainByTimer(3000);
        break;
    }
  }

  navigateMainByTimer(time: number): void {
    setTimeout(() => {
      this.router.navigate(["posts/feed/main"]);
    }, time);
  }
}
