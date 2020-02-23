import { MapLocation } from './MapLocation';
import { MarkerInfoWindow } from './MarkerInfoWindow';

export interface Marker{
   location:MapLocation;
   photoUrl:string;
   infoWindow:MarkerInfoWindow
   
}

