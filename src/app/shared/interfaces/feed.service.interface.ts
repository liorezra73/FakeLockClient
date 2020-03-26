import { Post } from "src/app/common/models/Post";
import { OrderBy } from "src/app/common/enums/orderBy";
import { Filter } from "src/app/common/models/Flter";
import { Subject } from "rxjs";

export interface IFeedService {
  posts: Subject<Post[]>;
  filterPosts(orderBy: OrderBy, filter: Filter): void;
}
