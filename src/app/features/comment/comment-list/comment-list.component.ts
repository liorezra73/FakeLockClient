import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { ICommentService } from "src/app/common/intefaces/comment-service.inteface";
import { CommentService } from "src/app/common/services/comment.service";
import { PostComment } from "src/app/common/models/PostComment";

@Component({
  selector: "app-comment-list",
  templateUrl: "./comment-list.component.html",
  styleUrls: ["./comment-list.component.css"]
})
export class CommentListComponent implements OnInit {
  @ViewChild('commentContent', { static: false }) commentContent: ElementRef;
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
    this.commentService
      .createComment(this.postId, comment)
      .subscribe(newcomment => {
        console.log(newcomment);
        // this.comments.push(newcomment);
      });
  }

  onLike(comment) {
    console.log(comment);
    this.commentService.doLike(this.postId, comment.id).subscribe(
      res => {
        comment.userLiked = true;
        comment.likes++;
      },
      err => this.handleError(err)
    );
  }

  onUnLike(comment) {
    this.commentService.unLike(this.postId, comment.id).subscribe(res => {
      comment.userLiked = false;
      comment.likes--;
    });
  }
  onSwitchLike(comment) {
    comment.userLiked ? this.onUnLike(comment) : this.onLike(comment);
  }

  handleError(error): void {
    switch (error.status) {
      case 0:
        alert("Connection error! please try again.");
        break;
      case 400:
        return;
        break;
      case 404:
        return;
        break;
      case 500:
        alert("Connection error! please try again.");
      default:
        alert("Connection error! Redirect to home page");
        break;
    }
  }
}
