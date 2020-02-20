import { Injectable, Inject } from "@angular/core";
import { IPhotoService } from "../intefaces/photo.service.interface";
import { Observable } from "rxjs";
import { AuthHttpProxyService } from "../proxies/auth-http-proxy.service";
import { APP_CONFIG } from "./config.service";

@Injectable({
  providedIn: "root"
})
export class PhotoService implements IPhotoService {
  photoUrl: string;
  constructor(
    private http: AuthHttpProxyService,
    @Inject(APP_CONFIG) config: any
  ) {
    this.photoUrl = `${config.baseApiURL}/photos`;
  }
  getPhotoByPhotoId(photoId: string):string {
    return `${this.photoUrl}/${photoId}`;
  }

  constru;
}
