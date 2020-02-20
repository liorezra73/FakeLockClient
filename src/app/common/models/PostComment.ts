import { User } from './User';

export interface PostComment {
  id?: number;
  publishDate?:Date;
  likes?: number;
  content?: string;
  tags?: string[];
  usersTags?: User[];
  userLiked?: boolean;
  username?: string;

}
