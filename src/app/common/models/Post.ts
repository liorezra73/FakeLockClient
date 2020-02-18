import { User } from './User';

export interface Post {
    id?: number;
    text: string;
    location: Location;
    photo?: File;
    PublishDate?: Date;
    usersTags: User[] | number[];
    tags: Tag[] | string[];
    likes?: Number;
    user?: User;
  }
  
  export interface Location {
    latitude: number;
    longtitude: number;
  }
  
  
  export interface Tag {
    title: string;
  }


  