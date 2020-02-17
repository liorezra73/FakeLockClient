import { Observable } from "rxjs";
import { PostComment } from "../models/PostComment";

export interface ICommentService {
  commentUrl: string;
  getCommentsByPostId(postId: number): Observable<PostComment[]>;
  createComment(comment: PostComment): void;
  deleteComment(id: number): void;
}
