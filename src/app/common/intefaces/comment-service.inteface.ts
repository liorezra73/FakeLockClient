import { Observable } from "rxjs";
import { PostComment } from "../models/PostComment";

export interface ICommentService {
  commentUrl: string;
  getCommentsByPostId(postId: number): Observable<PostComment[]>;
  createComment(postId: number, comment: PostComment): Observable<any>;
  deleteComment(id: number): Observable<any>;
  switchLike(id: number): Observable<any>;
}
