import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommentLayoutComponent } from "./comment-layout/comment-layout.component";
import { CommentFormComponent } from "./comment-form/comment-form.component";
import { CommentListComponent } from "./comment-list/comment-list.component";
import { CommentRoutingModule } from "src/app/shared/routes/comment-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommentModalComponent } from './comment-modal/comment-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { AppCommonModule } from 'src/app/common/common.module';
import { AppSharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CommentLayoutComponent,
    CommentFormComponent,
    CommentListComponent,
    CommentModalComponent
  ],
  imports: [CommonModule, CommentRoutingModule, ModalModule.forRoot(),AppCommonModule, ReactiveFormsModule, FormsModule,AppSharedModule],
  exports: [CommentModalComponent]
})
export class CommentModule {}
