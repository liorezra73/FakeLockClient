import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/common/models/post";
import { Router } from "@angular/router";
import { IPostService } from "src/app/common/intefaces/post-service.inteface";
import { PostService } from "src/app/common/services/post-service.service";
import { OrderBy } from "src/app/common/enums/orderBy";
import { NavigateService } from "src/app/shared/services/navigate.service";
import { INavigateService } from "src/app/shared/interfaces/navigate.service.interface";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-post-main-feed",
  templateUrl: "./post-main-feed.component.html",
  styleUrls: ["./post-main-feed.component.css"]
})
export class PostMainFeedComponent implements OnInit {
  postService: IPostService;
  navgiateService: INavigateService;
  posts: Post[];
  constructor(
    postService: PostService,
    private toastr: ToastrService,
    navigateService: NavigateService
  ) {
    this.postService = postService;
    this.navgiateService = navigateService;
  }

  ngOnInit() {
    this._getPosts();
  }

  private _getPosts(): void {
    this.postService.filterPosts(OrderBy.date, null);
    this.postService.posts$.subscribe(
      posts => {
        this.posts = posts;
      },
      err => {
        switch (err.status) {
          case 404:
            this.posts = [];
            break;
          default:
            this.toastr.error("something went wrong!try again later...");
            break;
        }
      }
    );
  }

  onPostSelect(postId: number) {
    this.navgiateService.navigate(`/posts/${postId}`);
  }
}
