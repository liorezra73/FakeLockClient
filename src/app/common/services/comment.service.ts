import { Injectable, Inject } from "@angular/core";
import { ICommentService } from "../intefaces/comment-service.inteface";
import { Observable } from "rxjs";
import { PostComment } from "../models/PostComment";
import { AuthHttpProxyService } from "../proxies/auth-http-proxy.service";
import { APP_CONFIG } from "./config.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CommentService implements ICommentService {
  commentUrl: string;
  postId: string;
  constructor(
    private http: AuthHttpProxyService,
    @Inject(APP_CONFIG) config: any
  ) {
    this.commentUrl = `${config.baseApiURL}/posts`;
  }
  getCommentsByPostId(
    postId: string,
    size: number = 16,
    toSearchAfter: boolean = false
  ): Observable<PostComment[]> {
    this.postId = postId;

    let url = `${this.commentUrl}/${this.postId}/comments?size=${size}`;

    if (toSearchAfter) {
      const searchAfter = {
        score: localStorage.getItem("searchAfterScoreComments"),
        id: localStorage.getItem("searchAfterIdComments"),
      };
      url += `&searchAfterScore=${searchAfter.score}&searchAfterId=${searchAfter.id}`;
    }
    return this.http.get<PostComment[]>(url).pipe(
      map((res) => {
        if (res.length > 0) {
          localStorage.setItem(
            "searchAfterScoreComments",
            res[res.length - 1].searchAfter.score
          );
          localStorage.setItem(
            "searchAfterIdComments",
            res[res.length - 1].searchAfter.id
          );
        }
        return res.map((com) => this.getCommentsPipe(com));
      })
    );
  }
  createComment(postId: string, comment: PostComment): Observable<any> {
    const tags: string[] = [],
      usersTags: number[] = [];
    comment.tags.forEach((x) => tags.push(x.title));
    comment.usersTags.forEach((x) => usersTags.push(x.id));
    comment.tags = tags;
    comment.usersTags = usersTags;
    return this.http
      .post(`${this.commentUrl}/${postId}/comments`, comment)
      .pipe(
        map((res) => {
          return this.getCommentsPipe(res);
        })
      );
  }
  deleteComment(postId: string, id: string): Observable<any> {
    this.postId = postId;
    return this.http.delete(`${this.commentUrl}/${this.postId}/comments/${id}`);
  }
  doLike(postId: string, id: string): Observable<any> {
    this.postId = postId;
    return this.http.post(
      `${this.commentUrl}/${this.postId}/comments/${id}/likes`,
      null
    );
  }

  unLike(postId: string, id: string): Observable<any> {
    this.postId = postId;
    return this.http.delete(
      `${this.commentUrl}/${this.postId}/comments/${id}/likes`
    );
  }



  private getCommentsPipe(i): PostComment {
    return {
      id: i.commentId as string,
      content: i.content,
      publishDate: i.publishDate,
      tags: i.tags,
      usersTags: i.usersTags,
      likes: i.likes,
      userLiked: i.userLiked,
      user: {
        id: parseInt(i.user.id),
        username: i.user.username,
      },
    };
  }
}
