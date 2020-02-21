import { Observable } from "rxjs";
import { PostComment } from "../models/PostComment";

export interface ICommentService {
  commentUrl: string;
  getCommentsByPostId(postId: number): Observable<PostComment[]>;
  createComment(postId: number, comment: PostComment): Observable<any>;
  deleteComment(postId: number, id: number): Observable<any>;
  doLike(postId: number, id: number): Observable<any>;
  unLike(postId: number, id: number): Observable<any>;
}
