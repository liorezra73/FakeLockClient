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
  @ViewChild("commentContent", { static: false }) commentContent: ElementRef;
  comments: PostComment[] = [];
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
        console.log(this.comments);
      },
      err => {
        switch (err.status) {
          case 400:
            alert("form not valid!");
            break;
          case 404:
            return;
            break;
          default:
            alert("something went wrong!try again later...");
            break;
        }
      }
    );
  }

  createComment(comment: PostComment) {
    this.commentService.createComment(this.postId, comment).subscribe(
      (newComment: PostComment) => {
        console.log(newComment)
        this.comments.push(newComment);
      },
      err => {
        switch (err.status) {
          case 400:
            alert("form not valid!");
            break;
          case 404:
            alert("post is not exist");
            break;
          default:
            alert("somthin went wrong!try again later...");
            break;
        }
      }
    );
  }

  onLike(comment) {
    this.commentService.doLike(this.postId, comment.id).subscribe(
      res => {
        comment.userLiked = true;
        comment.likes++;
      },
      err => {
        switch (err.status) {
          case 404:
            alert("comment not exist");
            break;
          default:
            alert("somthin went wrong!try again later...");
            break;
        }
      }
    );
  }

  onUnLike(comment) {
    this.commentService.unLike(this.postId, comment.id).subscribe(
      res => {
        comment.userLiked = false;
        comment.likes--;
      },
      err => {
        switch (err.status) {
          case 404:
            alert("comment not exist");
            break;
          default:
            alert("somthin went wrong!try again later...");
            break;
        }
      }
    );
  }
  onSwitchLike(comment) {
    comment.userLiked ? this.onUnLike(comment) : this.onLike(comment);
  }
}
