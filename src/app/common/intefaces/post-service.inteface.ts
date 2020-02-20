import { Observable } from "rxjs";
import { Post } from "../models/post";
import { OrderBy } from "../enums/orderBy";

export interface IPostService {
  postUrl: string;
  getPosts(orderBy: OrderBy): Observable<Post[]>;
  getPostById(id: number): Observable<Post>;
  createPost(post: Post, photo: File): Observable<any>;
  deletePost(id: number): Observable<any>;
  switchLike(id: number): Observable<any>;
}
