import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ICommentService } from "src/app/common/intefaces/comment-service.inteface";
import { CommentService } from "src/app/common/services/comment.service";
import { PostComment } from "src/app/common/models/PostComment";
import { ToastrService } from "ngx-toastr";
import { INavigateService } from "src/app/shared/interfaces/navigate.service.interface";
import { NavigateService } from "src/app/shared/services/navigate.service";

@Component({
  selector: "app-comment-list",
  templateUrl: "./comment-list.component.html",
  styleUrls: ["./comment-list.component.css"]
})
export class CommentListComponent implements OnInit {
  comments: PostComment[] = [];
  commentService: ICommentService;
  navigateService: INavigateService;
  @Input()
  postId: number;
  @Output() closeModal = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    commentService: CommentService,
    navigateService: NavigateService
  ) {
    this.commentService = commentService;
    this.navigateService = navigateService;
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
          case 401:
            this.closeModal.emit();
            this.toastr.warning("please login...");
            this.navigateService.navigate("/home/login");
            break;
          default:
            this.toastr.error("something went wrong!try again later...");
            this.closeModal.emit();
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
          case 401:
            this.toastr.warning("please login...");
            this.closeModal.emit();
            this.navigateService.navigate("/home/login");
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

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
