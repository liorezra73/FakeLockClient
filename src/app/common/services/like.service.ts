import { Injectable } from '@angular/core';
import { ILikeService } from '../intefaces/like-service.inteface';

@Injectable({
  providedIn: 'root'
})
export class LikeService implements ILikeService{
  likeUrl: string;
  addLike(): void {
    throw new Error("Method not implemented.");
  }
  cancelLike(): void {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
