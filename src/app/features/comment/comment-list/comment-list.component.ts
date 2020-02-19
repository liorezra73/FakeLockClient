import { Component, OnInit } from "@angular/core";
import { ICommentService } from "src/app/common/intefaces/comment-service.inteface";
import { CommentService } from "src/app/common/services/comment.service";

@Component({
  selector: "app-comment-list",
  templateUrl: "./comment-list.component.html",
  styleUrls: ["./comment-list.component.css"]
})
export class CommentListComponent implements OnInit {
  commentService: ICommentService;
  constructor(commentService: CommentService) {
    this.commentService = commentService;
  }

  ngOnInit() {
    this.commentService.getCommentsByPostId(10013).subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )
  }
}
