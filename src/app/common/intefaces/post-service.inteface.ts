import { Observable } from "rxjs";
import { Post } from "../models/post";
import { OrderBy } from "../enums/orderBy";
import { Filter } from '../models/filter';

export interface IPostService {
  postUrl: string;
  getPosts(orderBy: OrderBy): Observable<Post[]>;
  getPostById(id: number): Observable<Post>;
  createPost(post: Post): Observable<any>;
  deletePost(id: number): Observable<any>;
  doLike(id: number): Observable<any>;
  unLike(id: number): Observable<any>;
  filterPosts(orderBy: OrderBy, filter: Filter): Observable<Post[]>;
}
