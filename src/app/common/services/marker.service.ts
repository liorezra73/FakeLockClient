import { Injectable } from "@angular/core";
import { IMarkerService } from "../intefaces/marker.service.interface";
import { Marker } from "../models/marker";
import { BehaviorSubject } from "rxjs";
import { IPostService } from "../intefaces/post-service.inteface";
import { PostService } from "./post-service.service";
import { Post } from "../models/post";

@Injectable({
  providedIn: "root"
})
export class MarkerService implements IMarkerService {
  postService: IPostService;
  markers$: BehaviorSubject<Marker[]>;

  constructor(postService: PostService) {
    this.postService = postService;
    this.markers$ = new BehaviorSubject<Marker[]>(null);
  }

  initializeMarkers():void {
    this.postService.posts$.subscribe((res: Post[]) => {
      this.markers$.next(res.map(post => this.mapPostToMarker(post)));
    });
  }

  private mapPostToMarker(i: Post): Marker {
    return {
      location: i.location,
      photoUrl: i.photo as string,
      infoWindow: {
        title: "",
        description: i.text
      }
    };
  }
}
