import { Injectable } from "@angular/core";
import { IPostService } from "src/app/common/intefaces/post-service.inteface";
import { PostService } from "src/app/common/services/post-service.service";
import { Post } from "src/app/common/models/post";
import { OrderBy } from "src/app/common/enums/orderBy";
import { Filter } from "src/app/common/models/filter";
import { IFeedService } from "../interfaces/feed.service.interface";

@Injectable({
  providedIn: "root"
})
export class FeedService implements IFeedService {
  private postService: IPostService;
  posts: Post[];

  constructor(postService: PostService) {
    this.postService = postService;
    this.filterPosts(null, null);
  }

  // posts(): Post[] {
  //   return this._posts;
  // }

  filterPosts(orderBy: OrderBy, filter: Filter): void {
    this.postService.filterPosts(orderBy, filter).subscribe(
      (res: Post[]) => {
        this.posts = res;
      },
      err => {
        switch (err.status) {
          case 400:
            alert("filter not valid");
            break;
          case 404:
            alert("posts not exists");
            break;
          default:
            alert("something went wrong!try again later...");
            break;
        }
      }
    );
  }
}
