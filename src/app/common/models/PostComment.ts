import { User } from "./User";
import { Tag } from "./Tag";

export interface PostComment {
  id?: number;
  publishDate?: Date;
  likes?: number;
  content?: string;
  tags?: string[]| Tag[];
  usersTags?: User[] |number[];
  userLiked?: boolean;
  username?: string;
}
