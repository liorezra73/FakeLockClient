import { Injectable, Inject } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { Post } from "../models/Post";
import { IPostService } from "../intefaces/post-service.inteface";
import { APP_CONFIG } from "./config.service";
import { map, catchError, retry, shareReplay } from "rxjs/operators";
import { AuthHttpProxyService } from "../proxies/auth-http-proxy.service";
import { OrderBy } from "../enums/orderBy";
import { Filter } from "../models/Flter";
import { IPhotoService } from "../intefaces/photo.service.interface";
import { PhotoService } from "./photo.service";
import { IMarkerService } from "../intefaces/marker.service.interface";
import { MarkerService } from "./marker.service";

@Injectable({
  providedIn: "root",
})
export class PostService implements IPostService {

  postUrl: string;
  posts$: BehaviorSubject<Post[]>;
  photoService: IPhotoService;
  markerService: IMarkerService;
  filter: Filter = null;

  constructor(
    private http: AuthHttpProxyService,
    @Inject(APP_CONFIG) config: any,
    photoService: PhotoService,
    markerService: MarkerService
  ) {
    this.postUrl = `${config.baseApiURL}/posts`;
    this.posts$ = new BehaviorSubject<Post[]>(null);
    this.photoService = photoService;
    this.markerService = markerService;
  }

  startFilterMode(filter: Filter) {
    this.filter = filter;
  }

  endFilterMode() {
    this.filter = null;
  }

  filterPosts(
    orderBy: OrderBy,
    size: number = 16,
    toSearchAfter: boolean = false
  ): void {

    let filterUrl: string = `${this.postUrl}?orderBy=${
      orderBy ? orderBy : "date"
    }&size=${size ? size : 16}`;

    if (toSearchAfter) {
      const searchAfter = {
        score: localStorage.getItem("searchAfterScorePosts"),
        id: localStorage.getItem("searchAfterIdPosts"),
      };
      filterUrl += `&searchAfterScore=${searchAfter.score}&searchAfterId=${searchAfter.id}`;
    }

    if (this.filter) {
      const radiusFilterValid: boolean = !!this.filter.radius.distance;

      const radiusFilter: string = radiusFilterValid
        ? `&distance=${this.filter.radius.distance}&latitude=${this.filter.radius.location.latitude}&longtitude=${this.filter.radius.location.longtitude}`
        : "";

      const stratDateFilter: string = this.filter.dates.startDate
        ? `&startDate=${this.filter.dates.startDate}`
        : "";
      const endDateFilter: string = this.filter.dates.endDate
        ? `&endDate=${this.filter.dates.endDate}`
        : "";

      let tagsFilter: string = "";
      if (this.filter.tags.length > 0) {
        this.filter.tags.forEach((t) => (tagsFilter += `&tags[]=${t.title}`));
      }

      let usersTagsFilter: string = "";
      if (this.filter.usersTags.length > 0) {
        this.filter.usersTags.forEach(
          (ut) => (usersTagsFilter += `&usersTags[]=${ut.id}`)
        );
      }

      let publisherFilter: string = "";
      if (this.filter.publishers.length > 0) {
        this.filter.publishers.forEach(
          (p) => (publisherFilter += `&publishers[]=${p.id}`)
        );
      }
      filterUrl +=
        `${radiusFilter}` +
        `${stratDateFilter}` +
        `${endDateFilter}` +
        `${tagsFilter}` +
        `${usersTagsFilter}` +
        `${publisherFilter}`;

    }

    this.http.get(filterUrl).subscribe((res) => {
      if (res.length > 0) {
        localStorage.setItem(
          "searchAfterScorePosts",
          res[res.length - 1].searchAfter.score
        );
        localStorage.setItem(
          "searchAfterIdPosts",
          res[res.length - 1].searchAfter.id
        );

        const posts = res.map((post: Post) => {
          const p = this.postsDataPipe({ ...post });
          p.photo = this.photoService.getPhotoByPhotoId(p.photo as string);
          return p;
        });

        if (toSearchAfter) {
          const currentPosts = this.posts$.value;
          this.posts$.next([...currentPosts, ...posts]);
        } else {
          this.posts$.next(posts);
        }

        this.markerService.markers$.next(
          res.map((post: Post) => {
            const p = this.markerService.mapPostToMarker({ ...post });
            p.photoUrl = this.photoService.getPhotoByPhotoId(
              p.photoUrl as string
            );
            return p;
          })
        );
      } else {
        this.posts$.next([]);
        this.markerService.markers$.next([]);
      }
    });
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.postUrl}/${id}`).pipe(
      retry(3),
      map((res: Post) => {
        return this.postDataPipe(res);
      }),
      shareReplay()
    );
  }
  createPost(post: Post): Observable<number> {
    const tags: string[] = [],
      usersTags: number[] = [];
    post.tags.forEach((x) => tags.push(x.title));
    post.usersTags.forEach((x) => usersTags.push(x.id));
    post.tags = tags;
    post.usersTags = usersTags;
    const { photo } = { ...post };

    const formData = new FormData();
    formData.append("photo", photo);
    delete post.photo;
    const postJson = JSON.stringify(post);
    formData.append("post", postJson);
    return this.http.post(this.postUrl, formData).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.postUrl}/${id}`);
  }

  doLike(id: string): Observable<any> {
    return this.http.post(`${this.postUrl}/${id}/likes`, null);
  }

  unLike(id: string): Observable<any> {
    return this.http.delete(`${this.postUrl}/${id}/likes`);
  }

  private postsDataPipe(i): Post {
    return {
      id: i.postId,
      photo: i.photo,
      location: i.location,
      publishDate: i.publishDate,
      likes: i.likes,
    };
  }

  private postDataPipe(i): Post {
    return {
      id: i.id,
      text: i.text,
      location: {
        latitude: i.Location.latitude,
        longtitude: i.Location.longtitude,
      },
      publishDate: i.publishDate,
      user: {
        id: i.user.user_id,
        username: i.user.username,
      },
      tags: i.tags,
      usersTags: i.usersTags,
      likes: i.likes,
      photo: i.photo,
      isLikedByUser: i.isLikedByUser,
      commentsCount: i.commentsCount,
    };
  }
}
