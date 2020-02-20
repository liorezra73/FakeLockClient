import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../models/post";
import { IPostService } from "../intefaces/post-service.inteface";
import { APP_CONFIG } from "./config.service";
import { map } from "rxjs/operators";
import { AuthHttpProxyService } from "../proxies/auth-http-proxy.service";
import { OrderBy } from "../enums/orderBy";

@Injectable({
  providedIn: "root"
})
export class PostService implements IPostService {

  postUrl: string;

  constructor(
    private http: AuthHttpProxyService,
    @Inject(APP_CONFIG) config: any
  ) {
    this.postUrl = `${config.baseApiURL}/posts`;
  }

  getPosts(orderBy: OrderBy): Observable<Post[]> {
    return this.http
      .get<Observable<Post[]>>(`${this.postUrl}?orderBy=${orderBy}`)
      .pipe(
        map((res: Post[]) => {
          return res.map((post: Post) => this.postsDataPipe(post));
        })
      );
  }
  getPostById(id: number): Observable<Post> {
    return this.http.get<Observable<Post>>(`${this.postUrl}/${id}`).pipe(
      map((res: Post) => {
        return this.postDataPipe(res);
      })
    );
  }
  createPost(post: Post, photo: File): Observable<any> {
    const tags: string[] = [],
      usersTags: number[] = [];
    post.tags.forEach(x => tags.push(x.title));
    post.usersTags.forEach(x => usersTags.push(x.id));
    post.tags = tags;
    post.usersTags = usersTags;
    const formData = new FormData();
    const postJson = JSON.stringify(post);
    formData.append("post", postJson);
    formData.append("photo", photo);
    return this.http.post<FormData>(this.postUrl, formData);
  }
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.postUrl}/${id}`);
  }

  switchLike(id: number): Observable<any> {
    return this.http.post(`${this.postUrl}/${id}/likes`, null);
  }

  private postsDataPipe(i): Post {
    return {
      id: i.postId,
      photo: i.photo,
      location: i.location,
      publishDate: i.publishDate,
      likes: i.likes
    };
  }

  private postDataPipe(i): Post {
    return {
      id: i.Id,
      text: i.Text,
      location: {
        latitude: i.Location.latitude,
        longtitude: i.Location.longtitude
      },
      publishDate: i.PublishDate,
      user: {
        id: i.user.Id,
        username: i.user.Username
      },
      tags: i.tags,
      usersTags: i.usersTags,
      likes: i.likes,
      photo: i.Photo,
      isLikedByUser: i.isLikedByUser,
      commentsCount: i.commentsCount
    };
  }
}
