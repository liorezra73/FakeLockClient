import { Observable, BehaviorSubject } from "rxjs";
import { Post } from "../models/Post";
import { OrderBy } from "../enums/orderBy";
import { Filter } from '../models/Flter';

export interface IPostService {
  postUrl: string;
  posts$: BehaviorSubject<Post[]>;
  getPosts(orderBy: OrderBy): void;
  getPostById(id: number): Observable<Post>;
  createPost(post: Post): Observable<any>;
  deletePost(id: number): Observable<any>;
  doLike(id: number): Observable<any>;
  unLike(id: number): Observable<any>;
  filterPosts(orderBy: OrderBy, filter: Filter): void;
}
