import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostLayoutComponent } from "src/app/features/post/post-layout/post-layout.component";
import { PostLayoutFeedComponent } from "src/app/features/post/post-layout-feed/post-layout-feed.component";
import { PostMainFeedComponent } from "src/app/features/post/post-main-feed/post-main-feed.component";
import { PostMapFeedComponent } from "src/app/features/post/post-map-feed/post-map-feed.component";
import { PostFormComponent } from "src/app/features/post/post-form/post-form.component";
import { PostDetailsComponent } from "src/app/features/post/post-details/post-details.component";
import { IdGuard } from "../guards/id.guard";

const routes: Routes = [
  {
    path: "",
    component: PostLayoutComponent,
    children: [
      { path: "", redirectTo: "feed", pathMatch: "full" },
      {
        path: "feed",
        component: PostLayoutFeedComponent,
        children: [
          { path: "", redirectTo: "main", pathMatch: "full" },
          {
            path: "main",
            component: PostMainFeedComponent
          },
          {
            path: "map",
            component: PostMapFeedComponent
          }
        ]
      },
      { path: "form", component: PostFormComponent },
      {
        path: ":postId",
        component: PostDetailsComponent
        // children: [
        //   {
        //     path: "comments",
        //     loadChildren: () =>
        //       import("../../features/comment/comment.module").then(
        //         m => m.CommentModule
        //       )
        //   }
        // ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {}
