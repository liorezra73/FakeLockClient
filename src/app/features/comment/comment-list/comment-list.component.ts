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
  styleUrls: ["./comment-list.component.css"],
})
export class CommentListComponent implements OnInit {
  comments: PostComment[] = [];
  commentService: ICommentService;
  navigateService: INavigateService;
  @Input()
  postId: string;
  @Output() closeModal = new EventEmitter();
  toSearchAfter = false;
  allowSearch = true;

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

  getCommentsByPostId(postId: string, size: number = 5): void {
    if (this.allowSearch) {
      this.allowSearch = false;
      this.commentService
        .getCommentsByPostId(postId, size, this.toSearchAfter)
        .subscribe(
          (comments) => {
            if (comments) {
              if (comments.length > 0)
                this.comments = [...this.comments, ...comments];
              else {
                this.toSearchAfter = false;
              }
            }
          },
          (err) => {
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
          },
          () => (this.allowSearch = true)
        );
    }
  }

  private _onAfterSearch(): void {
    this.toSearchAfter = true;
    this.getCommentsByPostId(this.postId);
  }

  addNewComment(comment: PostComment) {
    console.log("dsadsadasd")
    this.comments = [comment, ...this.comments];
    this.toastr.success("comment created!");
  }

  onCloseModal() {
    this.closeModal.emit();
    this.navigateService.navigate("/home/login");
  }

  // createComment(comment: PostComment) {
  //   this.commentService.createComment(this.postId, comment).subscribe(
  //     (newComment: PostComment) => {
  //       console.log(newComment);
  //       this.comments.push(newComment);
  //       this.toastr.success("comment created!");
  //     },
  //     (err) => {
  //       switch (err.status) {
  //         case 400:
  //           this.toastr.error("form not valid!");
  //           break;
  //         case 401:
  //           this.toastr.warning("please login...");
  //           this.closeModal.emit();
  //           this.navigateService.navigate("/home/login");
  //           break;
  //         case 404:
  //           this.toastr.error("post is not exist");
  //           break;
  //         default:
  //           this.toastr.error("something went wrong!try again later...");
  //           break;
  //       }
  //     }
  //   );
  // }

  onLike(comment) {
    this.commentService.doLike(this.postId, comment.id).subscribe(
      (res) => {
        comment.userLiked = true;
        comment.likes++;
      },
      (err) => {
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
      (res) => {
        comment.userLiked = false;
        comment.likes--;
      },
      (err) => {
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
