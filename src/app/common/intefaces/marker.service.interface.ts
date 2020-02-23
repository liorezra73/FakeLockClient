import { BehaviorSubject } from "rxjs";
import { Marker } from "../models/marker";
import { Post } from "../models/post";

export interface IMarkerService {
  markers$: BehaviorSubject<Marker[]>;
  mapPostToMarker(i: Post): Marker;
}
