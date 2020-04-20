import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PostComment } from "src/app/common/models/PostComment";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CommentService } from "src/app/common/services/comment.service";
import { ToastrService } from "ngx-toastr";
import { ICommentService } from "src/app/common/intefaces/comment-service.inteface";
import { SocketioService } from 'src/app/common/services/socketio.service';

@Component({
  selector: "app-comment-form",
  templateUrl: "./comment-form.component.html",
  styleUrls: ["./comment-form.component.css"],
})
export class CommentFormComponent implements OnInit {
  @Output() onAddComment = new EventEmitter<PostComment>();
  // @Output() onAuthError = new EventEmitter<PostComment>();
  commentForm: FormGroup;
  newComment: PostComment;
  commentService: ICommentService;
  @Input() postId: string;

  constructor(private socketService: SocketioService,commentService: CommentService, private toastr: ToastrService) {
    this.commentService = commentService;
  }
  ngOnInit() {
    this.initializeComment();
    this.initializeCommentForm();
  }

  onSend(): void {
    const { content, tags, usersTags } = this.commentForm.controls;
    if (
      !content.value &&
      tags.value.length === 0 &&
      usersTags.value.length === 0
    ) {
      alert("comment not valid!");
    } else {
      this.newComment = this.commentForm.value;
      this.CreateComment(this.newComment);
    }
  }

  CreateComment(comment: PostComment) {
    this.commentService.createComment(this.postId as string, comment).subscribe(
      (res: PostComment) => {
        this.onAddComment.emit(res);
        this.socketService.emit("comment");
      },
      (err) => {
        switch (err.status) {
          case 400:
            this.toastr.error("form not valid!");
            break;
          case 401:
            this.toastr.warning("please login...");
            // this.onAuthError.emit();
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

  initializeComment(): void {
    this.newComment = {
      content: "",
      usersTags: [],
      tags: [],
    };
  }
  initializeCommentForm(): void {
    this.commentForm = new FormGroup({
      content: new FormControl(
        this.newComment.content,
        Validators.compose([Validators.minLength(3), Validators.maxLength(200)])
      ),
      tags: new FormControl(this.newComment.tags),
      usersTags: new FormControl(this.newComment.usersTags),
    });
  }
}
