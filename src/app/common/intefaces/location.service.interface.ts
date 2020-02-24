import { MapLocation } from "../models/MapLocation";
import { Observable } from "rxjs";

export interface ILocationService {
  getCurrentLocation(): Observable<MapLocation>;
}
