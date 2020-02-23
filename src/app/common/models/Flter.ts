import { MapLocation } from "./MapLocation";
import { Tag } from "./Tag";
import { User } from "./User";

export interface Filter {
  radius?: RadiusFilter;
  dates?: DatesFilter;
  tags?: Tag[] | string[];
  usersTags?: User[] | number[];
}

interface RadiusFilter {
  location: MapLocation;
  distance: number;
}
interface DatesFilter {
  startDate: Date;
  endDate: Date;
}
