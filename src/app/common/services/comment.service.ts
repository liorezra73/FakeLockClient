import { Injectable, Inject } from "@angular/core";
import { ICommentService } from "../intefaces/comment-service.inteface";
import { Observable } from "rxjs";
import { PostComment } from "../models/PostComment";
import { AuthHttpProxyService } from "../proxies/auth-http-proxy.service";
import { APP_CONFIG } from "./config.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CommentService implements ICommentService {
  commentUrl: string;
  postId: number;
  constructor(
    private http: AuthHttpProxyService,
    @Inject(APP_CONFIG) config: any
  ) {
    this.commentUrl = `${config.baseApiURL}/posts`;
  }
  getCommentsByPostId(postId: number): Observable<PostComment[]> {
    this.postId = postId;
    return this.http
      .get<Observable<PostComment[]>>(
        `${this.commentUrl}/${this.postId}/comments`
      )
      .pipe(
        map((res: PostComment[]) => {
          return res;
        })
      );
  }
  createComment(postId: number, comment: PostComment): Observable<any> {
    throw new Error("Method not implemented.");
  }
  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.commentUrl}/${this.postId}/comments/${id}`);
  }
  switchLike(id: number): Observable<any> {
    throw new Error("Method not implemented.");
  }
}
