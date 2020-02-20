import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./shared/routes/app-routing.module";
import { PostModule } from "./features/post/post.module";
import { PostService } from "./common/services/post-service.service";
import CONFIG, { APP_CONFIG } from "./common/services/config.service";
import { UserService } from "./common/services/user.service";
import { UserModule } from "./features/user/user.module";
import { CommentModule } from "./features/comment/comment.module";
import { IdGuard } from "./shared/guards/id.guard";
import { AuthenticationService } from "./common/services/authentication.service";
import { AuthGuard } from "./shared/guards/auth.guard";
import { AppCommonModule } from "./common/common.module";
import { AppSharedModule } from "./shared/shared.module";
import { AuthHttpProxyService } from "./common/proxies/auth-http-proxy.service";
import { CommentService } from "./common/services/comment.service";
import { PhotoService } from "./common/services/photo.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PostModule,
    UserModule,
    CommentModule,
    AppCommonModule,
    AppSharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: PostService, useClass: PostService },
    { provide: UserService, useClass: UserService },
    { provide: CommentService, useClass: CommentService },
    { provide: PhotoService, useClass: PhotoService },
    { provide: AuthenticationService, useClass: AuthenticationService },
    { provide: APP_CONFIG, useValue: CONFIG },
    { provide: AuthHttpProxyService, useClass: AuthHttpProxyService },
    IdGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
