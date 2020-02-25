import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommentFormComponent } from "./comment-form/comment-form.component";
import { CommentListComponent } from "./comment-list/comment-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommentModalComponent } from "./comment-modal/comment-modal.component";
import { ModalModule } from "ngx-bootstrap";
import { AppCommonModule } from "src/app/common/common.module";
import { AppSharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    CommentFormComponent,
    CommentListComponent,
    CommentModalComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    AppCommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppSharedModule
  ],
  exports: [CommentModalComponent]
})
export class CommentModule {}
