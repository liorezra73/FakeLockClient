import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/home/login", pathMatch: "full" },
  {
    path: "home",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../../features/user/user.module").then(m => m.UserModule)
  },
  {
    path: "posts",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../../features/post/post.module").then(m => m.PostModule)
  },
  {
    path: "**",
    redirectTo: "/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
