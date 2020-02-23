import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../models/post";
import { IPostService } from "../intefaces/post-service.inteface";
import { APP_CONFIG } from "./config.service";
import { map } from "rxjs/operators";
import { AuthHttpProxyService } from "../proxies/auth-http-proxy.service";
import { OrderBy } from "../enums/orderBy";
import { Filter } from "../models/filter";

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

  filterPosts(orderBy: OrderBy, filter: Filter): Observable<Post[]> {
    let filterUrl: string = `${this.postUrl}?orderBy=${
      orderBy ? orderBy : "date"
    }`;
    if (filter) {
      const radiusFilterValid: boolean =
        !!filter.radius.distance &&
        !!filter.radius.location.latitude &&
        !!filter.radius.location.longtitude;

      const radiusFilter: string = radiusFilterValid
        ? `&distance=${filter.radius.distance}&latitude=${filter.radius.location.latitude}&longtitude=${filter.radius.location.longtitude}`
        : "";

      const stratDateFilter: string = filter.dates.startDate
        ? `&startDate=${filter.dates.startDate}`
        : "";
      const endDateFilter: string = filter.dates.endDate
        ? `&endDate=${filter.dates.endDate}`
        : "";

      let tagsFilter: string = "";
      if (filter.tags.length > 0) {
        filter.tags.forEach(t => (tagsFilter += `&tags[]=${t.title}`));
      }

      let usersTagsFilter: string = "";
      if (filter.usersTags.length > 0) {
        filter.usersTags.forEach(
          ut => (usersTagsFilter += `&usersTags[]=${ut.id}`)
        );
      }
      filterUrl +=
        `${radiusFilter}` +
        `${stratDateFilter}` +
        `${endDateFilter}` +
        `${tagsFilter}` +
        `${usersTagsFilter}`;
    }

    return this.http.get(filterUrl).pipe(
      map((res: Post[]) => {
        return res.map((post: Post) => this.postsDataPipe(post));
      })
    );
  }

  getPosts(orderBy: OrderBy): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}?orderBy=${orderBy}`).pipe(
      map((res: Post[]) => {
        return res.map((post: Post) => this.postsDataPipe(post));
      })
    );
  }
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.postUrl}/${id}`).pipe(
      map((res: Post) => {
        return this.postDataPipe(res);
      })
    );
  }
  createPost(post: Post): Observable<number> {
    const tags: string[] = [],
      usersTags: number[] = [];
    post.tags.forEach(x => tags.push(x.title));
    post.usersTags.forEach(x => usersTags.push(x.id));
    post.tags = tags;
    post.usersTags = usersTags;
    const { photo } = { ...post };

    const formData = new FormData();
    formData.append("photo", photo);
    delete post.photo;
    const postJson = JSON.stringify(post);
    formData.append("post", postJson);
    return this.http.post(this.postUrl, formData);
  }
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.postUrl}/${id}`);
  }

  doLike(id: number): Observable<any> {
    return this.http.post(`${this.postUrl}/${id}/likes`, null);
  }

  unLike(id: number): Observable<any> {
    return this.http.delete(`${this.postUrl}/${id}/likes`);
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
