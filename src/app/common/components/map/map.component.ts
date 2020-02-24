import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MapLocation } from "src/app/common/models/MapLocation";
import { Marker } from "../../models/marker";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  @Input() markers: Marker[];
  @Output() onSendMarkerId = new EventEmitter<number>();
  location: MapLocation;
  markersOnBounds: any[];

  icon = {
    url: "https://i.ya-webdesign.com/images/red-circle-icon-png-4.png",
    scaledSize: {
      width: 10,
      height: 20
    }
  };
  iconMode: boolean = true;

  constructor() {}
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
  checkMarkersInBounds(bounds) {
    this.markersOnBounds = [];
    this.markers.forEach(marker => {
      let markerPosition = {
        lat: marker.location.latitude,
        lng: marker.location.longtitude
      };

      if (bounds.contains(markerPosition)) {
        this.markersOnBounds.push(markerPosition);
      }
    });
    if (this.markersOnBounds.length > 3) {
      this.iconMode = true;
    } else {
      this.iconMode = false;
    }
  }

  onGoToPost(markerId: number): void {
    this.onSendMarkerId.emit(markerId);
  }
}
