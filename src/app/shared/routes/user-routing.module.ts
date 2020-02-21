import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserHomePageComponent } from "src/app/features/user/user-home-page/user-home-page.component";
import { UserLoginComponent } from "src/app/features/user/user-login/user-login.component";
import { UserFormComponent } from "src/app/features/user/user-form/user-form.component";

const routes: Routes = [
  {
    path: "",
    component: UserHomePageComponent,
    children: [
      { path: "login", component: UserLoginComponent},
      { path: "register", component: UserFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
