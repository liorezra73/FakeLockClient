import { User } from './User';
import { MapLocation } from './MapLocation';
import { Tag } from './Tag';

export interface Post {
    id?: number;
    text?: string;
    location: MapLocation;
    photo?: File|string;
    publishDate?: Date;
    usersTags?: User[] | number[];
    tags?: Tag[] | string[];
    likes?: Number;
    user?: User;
    isLikedByUser?:boolean;
    commentsCount?:number;
  }
  
