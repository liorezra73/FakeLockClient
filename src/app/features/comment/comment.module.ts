import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommentLayoutComponent } from "./comment-layout/comment-layout.component";
import { CommentFormComponent } from "./comment-form/comment-form.component";
import { CommentListComponent } from "./comment-list/comment-list.component";
import { CommentRoutingModule } from "src/app/shared/routes/comment-routing.module";
import { CommentModalComponent } from './comment-modal/comment-modal.component';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    CommentLayoutComponent,
    CommentFormComponent,
    CommentListComponent,
    CommentModalComponent
  ],
  imports: [CommonModule, CommentRoutingModule, ModalModule.forRoot()],
  exports: [CommentModalComponent]
})
export class CommentModule {}
