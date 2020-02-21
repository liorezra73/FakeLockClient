import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PostComment } from "src/app/common/models/PostComment";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-comment-form",
  templateUrl: "./comment-form.component.html",
  styleUrls: ["./comment-form.component.css"]
})
export class CommentFormComponent implements OnInit {
  @Output()
  onSendComment = new EventEmitter<PostComment>();
  commentForm: FormGroup;
  newComment: PostComment;

  constructor() {}
  ngOnInit() {
    this.initializeComment();
    this.initializeCommentForm();
  }

  onSend(): void {
    this.newComment = this.commentForm.value;
    this.onSendComment.emit(this.newComment);
  }

  initializeComment(): void {
    this.newComment = {
      content: "",
      usersTags: [],
      tags: []
    };
  }
  initializeCommentForm(): void {
    this.commentForm = new FormGroup({
      content: new FormControl(this.newComment.content),
      tags: new FormControl(this.newComment.tags),
      usersTags: new FormControl(this.newComment.usersTags)
    });
  }
}
