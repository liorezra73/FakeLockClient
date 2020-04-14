import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/common/models/Post";
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
  styleUrls: ["./post-main-feed.component.css"],
})
export class PostMainFeedComponent implements OnInit {
  postService: IPostService;
  navgiateService: INavigateService;
  posts: Post[] = [];
  toSearchAfter = false;
  allowSearch = true;

  constructor(
    postService: PostService,
    private toastr: ToastrService,
    navigateService: NavigateService
  ) {
    this.postService = postService;
    this.navgiateService = navigateService;
  }

  ngOnInit() {
    this.postService.endFilterMode();
    this._getPosts();
  }

  private _getPosts(): void {
    if (this.allowSearch) {
      this.allowSearch = false;

      this.postService.filterPosts(OrderBy.date, 8, this.toSearchAfter);
      this.postService.posts$.subscribe(
        (posts) => {
          if (posts) {
            if (posts.length > 0) this.posts = posts;
            else {
              this.toSearchAfter = false;
            }
          }
        },
        (err) => {
          console.log("err");
          switch (err.status) {
            case 404:
              this.posts = [];
              break;
            default:
              this.toastr.error("something went wrong!try again later...");
              break;
          }
        },
        () => (this.allowSearch = true)
      );
    }
  }

  private _onAfterSearch(): void {
    this.allowSearch = true;
    this.toSearchAfter = true;
    this._getPosts();
  }

  onPostSelect(postId: number) {
    this.navgiateService.navigate(`/posts/${postId}`);
  }
}
