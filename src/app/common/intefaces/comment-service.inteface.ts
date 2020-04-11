import { Observable } from "rxjs";
import { PostComment } from "../models/PostComment";

export interface ICommentService {
  commentUrl: string;
  getCommentsByPostId(postId: string,size:number,toSearchAfter: boolean): Observable<PostComment[]>;
  createComment(postId: string, comment: PostComment): Observable<any>;
  deleteComment(postId: string, id: string): Observable<any>;
  doLike(postId: string, id: string): Observable<any>;
  unLike(postId: string, id: string): Observable<any>;
}
