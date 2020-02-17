import { Observable } from "rxjs";
import { Post } from "../models/post";

export interface IPostService {
  postUrl: string;
  getPosts(): Observable<Post[]>;
  getPostById(id: number): Observable<Post>;
  createPost(post: Post, photo: File): boolean | Error;
  deletePost(id: number): void;
}
