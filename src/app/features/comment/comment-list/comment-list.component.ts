import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { ICommentService } from "src/app/common/intefaces/comment-service.inteface";
import { CommentService } from "src/app/common/services/comment.service";
import { PostComment } from "src/app/common/models/PostComment";
import { ToastrService } from "ngx-toastr";

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

  constructor(private toastr: ToastrService, commentService: CommentService) {
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
      err => {
        switch (err.status) {
          default:
            this.toastr.error("something went wrong!try again later...");
            break;
        }
      }
    );
  }

  createComment(comment: PostComment) {
    this.commentService.createComment(this.postId, comment).subscribe(
      (newComment: PostComment) => {
        this.comments.push(newComment);
        this.toastr.success("comment created!");
      },
      err => {
        switch (err.status) {
          case 400:
            this.toastr.error("form not valid!");
            break;
          case 404:
            this.toastr.error("post is not exist");
            break;
          default:
            this.toastr.error("something went wrong!try again later...");
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
            this.toastr.error("comment not exist");
            break;
          default:
            this.toastr.error("somthin went wrong!try again later...");
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
            this.toastr.error("comment not exist");
            break;
          default:
            this.toastr.error("somthin went wrong!try again later...");
            break;
        }
      }
    );
  }
  onSwitchLike(comment) {
    comment.userLiked ? this.onUnLike(comment) : this.onLike(comment);
  }
}
