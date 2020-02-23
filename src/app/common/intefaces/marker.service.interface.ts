import { BehaviorSubject } from 'rxjs';
import { Marker } from '../models/marker';

export interface IMarkerService{
    markers$: BehaviorSubject<Marker[]>;
    initializeMarkers():void;
}