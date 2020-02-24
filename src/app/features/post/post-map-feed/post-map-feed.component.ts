import { Component, OnInit } from "@angular/core";
import { IFeedService } from "src/app/shared/interfaces/feed.service.interface";
import { Post } from "src/app/common/models/post";
import { OrderBy } from "src/app/common/enums/orderBy";
import { IMarkerService } from "src/app/common/intefaces/marker.service.interface";
import { MarkerService } from "src/app/common/services/marker.service";
import { Marker } from "src/app/common/models/marker";
import { IPostService } from "src/app/common/intefaces/post-service.inteface";
import { PostService } from "src/app/common/services/post-service.service";
import { LocationService } from "src/app/common/services/location.service";

@Component({
  selector: "app-post-map-feed",
  templateUrl: "./post-map-feed.component.html",
  styleUrls: ["./post-map-feed.component.css"]
})
export class PostMapFeedComponent implements OnInit {
  markersService: IMarkerService;
  postService: IPostService;
  markers: Marker[];
  constructor(markersService: MarkerService, postService: PostService) {
    this.postService = postService;
    this.markersService = markersService;
  }

  ngOnInit() {
    this._getMarkers();
  }

  private _getMarkers(): void {
    this.postService.filterPosts(null, null);
    this.markersService.markers$.subscribe(
      markers => {
        console.log("markers");
        this.markers = markers;
      },
      err => console.log(err)
    );
  }
}
