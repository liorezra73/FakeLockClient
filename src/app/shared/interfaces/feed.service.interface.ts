import { Post } from "src/app/common/models/post";
import { OrderBy } from "src/app/common/enums/orderBy";
import { Filter } from "src/app/common/models/filter";

export interface IFeedService {
  posts: Post[];
  filterPosts(orderBy: OrderBy, filter: Filter): void;
}
