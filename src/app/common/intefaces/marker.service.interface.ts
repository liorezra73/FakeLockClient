import { BehaviorSubject } from "rxjs";
import { Marker } from "../models/Marker";
import { Post } from "../models/Post";

export interface IMarkerService {
  markers$: BehaviorSubject<Marker[]>;
  mapPostToMarker(i: Post): Marker;
}
