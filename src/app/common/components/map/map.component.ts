import { Component, OnInit, Input } from "@angular/core";
import { MapLocation } from "src/app/common/models/MapLocation";
import { Post } from "src/app/common/models/post";
import { Marker } from "../../models/marker";
import { IMarkerService } from "../../intefaces/marker.service.interface";
import { MarkerService } from "../../services/marker.service";


@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  location: MapLocation;
  @Input() markers: Marker[];
  constructor() {
  }
  ngOnInit() {
    this.initializeLocation();
  }

  initializeLocation() {
    navigator.geolocation.getCurrentPosition(
      res => {
        this.location = {
          latitude: res.coords.latitude,
          longtitude: res.coords.longitude
        };
      },
      err => {
        this.location = {
          latitude: 32.0970604,
          longtitude: 34.826543799999996
        };
      }
    );
  }
}
