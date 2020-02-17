import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommentLayoutComponent } from "src/app/features/comment/comment-layout/comment-layout.component";
import { CommentListComponent } from "src/app/features/comment/comment-list/comment-list.component";
import { CommentFormComponent } from "src/app/features/comment/comment-form/comment-form.component";

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  {
    path: "",
    component: CommentLayoutComponent,
    children: [
      { path: "list", component: CommentListComponent },
      { path: "form", component: CommentFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule {}
