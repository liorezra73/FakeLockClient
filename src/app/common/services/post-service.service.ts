import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../models/post";
import { HttpClient } from "@angular/common/http";
import { IPostService } from "../intefaces/post-service.inteface";
import { APP_CONFIG } from "./config.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PostService implements IPostService {
  postUrl: string;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) config: any) {
    this.postUrl = `${config.baseApiURL}/posts`;
  }

  getPosts(): Observable<Post[]> {
    throw new Error("Method not implemented.");
  }
  getPostById(id: number): Observable<Post> {
    return this.http.get<Observable<Post>>(`${this.postUrl}/${id}`).pipe(
      map(res => {
        return this.dataPipe(res);
      })
    );
  }
  createPost(post: Post, photo: File): boolean | Error {
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
    this.http.post<any>(this.postUrl, formData).subscribe(
      res => {
        return true;
      },
      err => err
    );
    return true;
  }
  deletePost(id: number): void {
    this.http.delete(`${this.postUrl}/${id}`).subscribe(
      res => {},
      err => {}
    );
  }

  private dataPipe(i): Post {
    return {
      id: i.Id,
      text: i.Text,
      location: {
        latitude: i.Location.latitude,
        longtitude: i.Location.longtitude
      },
      PublishDate: i.PublishDate,
      user: {
        id: i.user.Id,
        username: i.user.Username
      },
      tags: i.tags,
      usersTags: i.usersTags,
      likes: i.likes,
      photo: null
    };
  }
}
