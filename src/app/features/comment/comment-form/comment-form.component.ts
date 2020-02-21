import { Component, OnInit } from "@angular/core";
import { PostComment } from "src/app/common/models/PostComment";
import { FormGroup, FormControl } from "@angular/forms";


@Component({
  selector: "app-comment-form",
  templateUrl: "./comment-form.component.html",
  styleUrls: ["./comment-form.component.css"]
})
export class CommentFormComponent implements OnInit {
  commentForm: FormGroup;
  newComment: PostComment;
  constructor() {}
  ngOnInit() {
    this.initializeComment();
    this.initializeCommentForm();
  }

  onSend() {
    this.newComment = this.commentForm.value;
    console.log(this.newComment);
  }

  initializeComment() {
    this.newComment = {
      content: "",
      usersTags: [],
      tags: []
    };
  }
  initializeCommentForm() {
    this.commentForm = new FormGroup({
      content: new FormControl(this.newComment.content),
      tags: new FormControl(this.newComment.tags),
      userTags: new FormControl(this.newComment.usersTags)
    });
  }
}
