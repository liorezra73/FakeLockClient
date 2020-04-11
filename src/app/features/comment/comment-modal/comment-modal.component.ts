import {
  Component,
  OnInit,
  TemplateRef,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { PostComment } from "src/app/common/models/PostComment";

@Component({
  selector: "app-comment-modal",
  templateUrl: "./comment-modal.component.html",
  styleUrls: ["./comment-modal.component.css"]
})
export class CommentModalComponent implements OnInit {
  @Input()
  comments: PostComment[];
  @Input()
  postId: string;
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
  closeModal(){
    this.modalRef.hide();
    // this.modalRef.
  }
 
}
