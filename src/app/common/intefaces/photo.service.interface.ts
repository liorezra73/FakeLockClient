import { Observable } from "rxjs";

export interface IPhotoService {
  photoUrl: string;
  getPhotoByPhotoId(photoId: string): string;
}
