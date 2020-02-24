import { Injectable } from "@angular/core";
import { IMarkerService } from "../intefaces/marker.service.interface";
import { Marker } from "../models/marker";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MarkerService implements IMarkerService {
  markers$: BehaviorSubject<Marker[]>;

  constructor() {
    this.markers$ = new BehaviorSubject<Marker[]>(null);
  }

  mapPostToMarker(i): Marker {
    return {
      id: i.postId,
      location: i.location,
      photoUrl: i.photo as string,
      infoWindow: {
        title: "",
        description: i.text
      }
    };
  }
}
