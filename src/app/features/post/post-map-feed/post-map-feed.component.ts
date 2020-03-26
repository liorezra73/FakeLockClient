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
import { INavigateService } from "src/app/shared/interfaces/navigate.service.interface";
import { NavigateService } from "src/app/shared/services/navigate.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-post-map-feed",
  templateUrl: "./post-map-feed.component.html",
  styleUrls: ["./post-map-feed.component.css"]
})
export class PostMapFeedComponent implements OnInit {
  markersService: IMarkerService;
  postService: IPostService;
  markers: Marker[];
  navigateService: INavigateService;
  constructor(
    navigateService: NavigateService,
    markersService: MarkerService,
    private toastr: ToastrService,
    postService: PostService
  ) {
    this.postService = postService;
    this.markersService = markersService;
    this.navigateService = navigateService;
  }

  ngOnInit() {
    this._getMarkers();
  }
  onNavigatePost($event) {
    this.navigateService.navigate(`/posts/${$event}`);
  }

  private _getMarkers(): void {
    this.postService.filterPosts(OrderBy.likes, null);
    this.markersService.markers$.subscribe(
      markers => {
        this.markers = markers;
      },
      err => {
        switch (err.status) {
          case 400:
            this.toastr.error("form not valid!");
            break;
          case 404:
            this.markers = [];
            break;
          default:
            this.toastr.error("something went wrong!try again later...");
            break;
        }
      }
    );
  }
}
