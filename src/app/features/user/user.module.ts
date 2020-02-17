import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserFormComponent } from "./user-form/user-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserRoutingModule } from "src/app/shared/routes/user-routing.module";
import { UserLoginComponent } from './user-login/user-login.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { AppCommonModule } from 'src/app/common/common.module';

@NgModule({
  declarations: [UserFormComponent, UserLoginComponent, UserHomePageComponent],
  imports: [CommonModule, UserRoutingModule, FormsModule, ReactiveFormsModule,AppCommonModule],
  exports: [UserFormComponent]
})
export class UserModule {}
