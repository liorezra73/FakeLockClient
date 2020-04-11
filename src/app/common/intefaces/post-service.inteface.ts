import { Observable, BehaviorSubject } from "rxjs";
import { Post } from "../models/Post";
import { OrderBy } from "../enums/orderBy";
import { Filter } from "../models/Flter";

export interface IPostService {
  postUrl: string;
  posts$: BehaviorSubject<Post[]>;
  getPostById(id: string): Observable<Post>;
  createPost(post: Post): Observable<any>;
  deletePost(id: number): Observable<any>;
  doLike(id: string): Observable<any>;
  unLike(id: string): Observable<any>;
  filterPosts(
    orderBy: OrderBy,
    size: number,
    toSearchAfter: boolean
  ): void;
  startFilterMode(filter: Filter): void;
  endFilterMode(): void;
}
