import { Injectable } from '@angular/core';
import { ICommentService } from '../intefaces/comment-service.inteface';

@Injectable({
  providedIn: 'root'
})
export class CommentService implements ICommentService {
  commentUrl: string;
  getCommentsByPostId(postId: number): import("rxjs").Observable<import("../models/PostComment").PostComment[]> {
    throw new Error("Method not implemented.");
  }
  createComment(comment: import("../models/PostComment").PostComment): void {
    throw new Error("Method not implemented.");
  }
  deleteComment(id: number): void {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
