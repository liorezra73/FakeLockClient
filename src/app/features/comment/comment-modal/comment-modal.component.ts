import {
  Component,
  OnInit,
  TemplateRef,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";


@Component({
  selector: "app-comment-modal",
  templateUrl: "./comment-modal.component.html",
  styleUrls: ["./comment-modal.component.css"]
})
export class CommentModalComponent implements OnInit {
  @Input()
  comments: Comment[];
  @Input()
  postId: number;
  modalRef: BsModalRef;
  @Output()
  onCreateComment = new EventEmitter<Comment>();
  @Input()
  error: string;

  constructor(private modalService: BsModalService) {}
  ngOnInit() {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onCommentCreate(comment: Comment) {
    this.onCreateComment.emit({ ...comment });
  }
}
