import { Component, OnInit, ViewChild } from "@angular/core";
import { MapLocation } from "../../models/MapLocation";


@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  @ViewChild("map", { static: false }) map;
  lat: number = 31.978418;
  lng: number = 35.109007;
  location: MapLocation;
  constructor() {
    //this.initailLocation();
  }

  ngOnInit() {
    
  }

  initializeLocation() {}
  initailLocation() {
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
