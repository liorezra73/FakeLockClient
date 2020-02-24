import { Injectable } from "@angular/core";
import { MapLocation } from "../models/MapLocation";
import { Observable, Subscriber } from "rxjs";
import { ILocationService } from "../intefaces/location.service.interface";

@Injectable({
  providedIn: "root"
})
export class LocationService implements ILocationService {
  constructor() {}

  getCurrentLocation(): Observable<MapLocation> {
    return new Observable<MapLocation>((observer: Subscriber<MapLocation>) => {
      navigator.geolocation.getCurrentPosition(
        res => {
          observer.next({
            latitude: res.coords.latitude,
            longtitude: res.coords.longitude
          });
          observer.complete();
        },
        err => {
          observer.error(err);
        }
      );
    });
  }
}
