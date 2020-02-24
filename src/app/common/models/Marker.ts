import { MapLocation } from "./MapLocation";
import { MarkerInfoWindow } from "./MarkerInfoWindow";

export interface Marker {
  id: number;
  location: MapLocation;
  photoUrl: string;
  infoWindow: MarkerInfoWindow;
}
