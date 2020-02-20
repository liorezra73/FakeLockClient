import { Observable } from "rxjs";
import { PostComment } from "../models/PostComment";

export interface ICommentService {
  commentUrl: string;
  getCommentsByPostId(postId: number): Observable<PostComment[]>;
  createComment(postId: number, comment: PostComment): Observable<any>;
  deleteComment(postId: number,id: number): Observable<any>;
  switchLike(postId: number,id: number): Observable<any>;
}
