import { Component, OnInit, Input } from "@angular/core";
import { ICommentService } from "src/app/common/intefaces/comment-service.inteface";
import { CommentService } from "src/app/common/services/comment.service";
import { PostComment } from "src/app/common/models/PostComment";

@Component({
  selector: "app-comment-list",
  templateUrl: "./comment-list.component.html",
  styleUrls: ["./comment-list.component.css"]
})
export class CommentListComponent implements OnInit {
  comments: PostComment[];
  commentService: ICommentService;
  @Input()
  postId: number;

  constructor(commentService: CommentService) {
    this.commentService = commentService;
  }

  ngOnInit() {
    this.getCommentsByPostId(this.postId);
  }

  getCommentsByPostId(postId): void {
    this.commentService.getCommentsByPostId(postId).subscribe(
      comments => {
        this.comments = comments;
      },
      err => this.handleError(err)
    );
  }

  createComment(comment: PostComment) {
    console.log(comment)
    // this.commentService.createComment(this.postId, comment).subscribe();
  }

  handleError(error): void {
    switch (error.status) {
      case 0:
        alert("Connection error! please try again.");
        break;
      case 400:
        alert("No comments.");
        break;
      case 404:
        alert("No comments.");
        break;
      case 500:
        alert("Connection error! please try again.");
      default:
        alert("Connection error! Redirect to home page");
        break;
    }
  }
}
