import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./shared/routes/app-routing.module";
import { PostModule } from "./features/post/post.module";
import { PostService } from "./common/services/post-service.service";
import CONFIG, { APP_CONFIG } from "./common/services/config.service";
import { UserService } from "./common/services/user.service";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { UserModule } from "./features/user/user.module";
import { CommentModule } from "./features/comment/comment.module";
import { IdGuard } from "./shared/guards/id.guard";
import { AuthenticationService } from "./common/services/authentication.service";
import { AuthGuard } from "./shared/guards/auth.guard";
import { AppCommonModule } from './common/common.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PostModule,
    AutocompleteLibModule,
    UserModule,
    CommentModule,
    AppCommonModule
    
    
  ],
  providers: [
    { provide: PostService, useClass: PostService },
    { provide: UserService, useClass: UserService },
    { provide: AuthenticationService, useClass: AuthenticationService },
    { provide: APP_CONFIG, useValue: CONFIG },
    IdGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
