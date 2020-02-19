import { Observable } from "rxjs";
import { Post } from "../models/post";

export interface IPostService {
  postUrl: string;
  getPostsOrderByDates(): Observable<Post[]>;
  getPostById(id: number): Observable<Post>;
  createPost(post: Post, photo: File): Observable<any>;
  deletePost(id: number): Observable<any>;
  switchLike(id: number): Observable<any>;
}
