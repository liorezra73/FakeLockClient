import { Component, OnInit } from "@angular/core";
import { IFeedService } from "src/app/shared/interfaces/feed.service.interface";
import { FeedService } from "src/app/shared/services/feed.service";
import { Post } from "src/app/common/models/post";
import { OrderBy } from 'src/app/common/enums/orderBy';

@Component({
  selector: "app-post-map-feed",
  templateUrl: "./post-map-feed.component.html",
  styleUrls: ["./post-map-feed.component.css"]
})
export class PostMapFeedComponent implements OnInit {
  feedService: IFeedService;
  posts: Post[];
  constructor(feedService: FeedService) {
    this.feedService = feedService;
  }

  ngOnInit() {
    this.posts = this.feedService.posts;
  }
}
