import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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
import { ModalModule } from "ngx-bootstrap";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MarkerService } from "./common/services/marker.service";
import { ToastrModule } from "ngx-toastr";
import { LocationService } from "./common/services/location.service";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { SocketioService } from './common/services/socketio.service';
// import io from 'socket.io-client';
 
// const socket = io('http://localhost:3000');

// const config: SocketIoConfig = { url: "http://localhost:3000", options: {} };

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
    ModalModule,
    CommonModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: "toast-top-center" }),
    // SocketIoModule.forRoot(config),
    
  ],
  providers: [
    { provide: PostService, useClass: PostService },
    { provide: UserService, useClass: UserService },
    { provide: CommentService, useClass: CommentService },
    { provide: PhotoService, useClass: PhotoService },
    { provide: MarkerService, useClass: MarkerService },
    { provide: LocationService, useClass: LocationService },
    { provide: AuthenticationService, useClass: AuthenticationService },
    { provide: APP_CONFIG, useValue: CONFIG },
    { provide: AuthHttpProxyService, useClass: AuthHttpProxyService },
    { provide: SocketioService, useClass: SocketioService },
    IdGuard,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
