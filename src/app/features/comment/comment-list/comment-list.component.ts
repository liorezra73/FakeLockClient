import { Component, OnInit } from "@angular/core";
import { ICommentService } from "src/app/common/intefaces/comment-service.inteface";
import { CommentService } from "src/app/common/services/comment.service";
import { PostComment } from "src/app/common/models/PostComment";

@Component({
  selector: "app-comment-list",
  templateUrl: "./comment-list.component.html",
  styleUrls: ["./comment-list.component.css"]
})
export class CommentListComponent implements OnInit {
  comments: PostComment[] = [];
  commentService: ICommentService;
  constructor(commentService: CommentService) {
    this.commentService = commentService;
  }
  like() {
    this.commentService.deleteComment(10013, 58).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }
  ngOnInit() {}
}
