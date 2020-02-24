import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  NgZone
} from "@angular/core";
import { MapLocation } from "src/app/common/models/MapLocation";
import { Post } from "src/app/common/models/post";
import { Marker } from "../../models/marker";
import { IMarkerService } from "../../intefaces/marker.service.interface";
import { MarkerService } from "../../services/marker.service";
import { NavigateService } from "src/app/shared/services/navigate.service";
import { INavigateService } from "src/app/shared/interfaces/navigate.service.interface";
import { MapsAPILoader } from "@agm/core";
import { FormControl } from "@angular/forms";
declare var google: any;

declare namespace google.maps.places {
    export interface PlaceResult { geometry }
}
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  @Input() markers: Marker[];
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
  navigateService: INavigateService;
  constructor(
    navigateService: NavigateService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.navigateService = navigateService;
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
    console.log(this.iconMode);
  }

  onGoToPost(): void {
    this.navigateService.navigate("/posts");
  }
}
