import { Component, OnInit } from "@angular/core";
import { IFeedService } from "src/app/shared/interfaces/feed.service.interface";
import { Post } from "src/app/common/models/post";
import { OrderBy } from "src/app/common/enums/orderBy";
import { IMarkerService } from "src/app/common/intefaces/marker.service.interface";
import { MarkerService } from "src/app/common/services/marker.service";
import { Marker } from "src/app/common/models/marker";
import { IPostService } from "src/app/common/intefaces/post-service.inteface";
import { PostService } from "src/app/common/services/post-service.service";

@Component({
  selector: "app-post-map-feed",
  templateUrl: "./post-map-feed.component.html",
  styleUrls: ["./post-map-feed.component.css"]
})
export class PostMapFeedComponent implements OnInit {
  markersService: IMarkerService;
  postService: IPostService;
  markers: Marker[];

  lat: number = 51.678418;
  lng: number = 7.809007;
  constructor(markersService: MarkerService, postService: PostService) {
    this.postService = postService;
    this.markersService = markersService;
    this.markersService.initializeMarkers();
    this.markersService.markers$.subscribe(res => {
      this.markers = res;
    });
  }

  ngOnInit() {}
}
