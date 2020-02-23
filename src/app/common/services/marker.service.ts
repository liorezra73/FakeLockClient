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
  markers$: BehaviorSubject<Marker[]>;

  constructor() {
    this.markers$ = new BehaviorSubject<Marker[]>(null);
  }

  mapPostToMarker(i: Post): Marker {
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
