import { Observable } from "rxjs";
import { Post } from "../models/post";

export interface ILikeService {
  likeUrl: string;
  addLike(): void;
  cancelLike(): void;
}
