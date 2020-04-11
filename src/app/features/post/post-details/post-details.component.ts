import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/common/services/post-service.service";
import { IPostService } from "src/app/common/intefaces/post-service.inteface";
import { Router, ActivatedRoute } from "@angular/router";
import { Post } from "src/app/common/models/Post";
import { IPhotoService } from "src/app/common/intefaces/photo.service.interface";
import { PhotoService } from "src/app/common/services/photo.service";
import { OrderBy } from "src/app/common/enums/orderBy";
import { ToastrService } from "ngx-toastr";
import { INavigateService } from "src/app/shared/interfaces/navigate.service.interface";
import { NavigateService } from "src/app/shared/services/navigate.service";

@Component({
  selector: "app-post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {
  postId: string;
  post: Post;
  postService: IPostService;
  photoService: IPhotoService;
  navigateService: INavigateService;

  constructor(
    navigateService: NavigateService,
    private activatedRoute: ActivatedRoute,
    postService: PostService,
    photoSerice: PhotoService,
    private toastr: ToastrService
  ) {
    this.postService = postService;
    this.photoService = photoSerice;
    this.activatedRoute.params.subscribe(
      res => (this.postId = res.postId)
    );
    this.navigateService = navigateService;
  }

  ngOnInit() {
    this.getPostById(this.postId);
  }

  getPostById(postId: string) {
    this.postService.getPostById(postId).subscribe(
      post => {
        this.post = post;
        this.post.photo = this.photoService.getPhotoByPhotoId(
          this.post.photo as string
          );
          console.log(this.post)
      },
      err => {
        switch (err.status) {
          case 401:
            this.toastr.warning("please login...");
            this.navigateService.navigate("/home/login");
            break;
          case 404:
            this.toastr.warning("page not found...");
            this.navigateService.navigate("/posts");
            break;
          default:
            this.toastr.warning("somthing went wrong!try again later...");
            break;
        }
      }
    );
  }

  onLike() {
    console.log("Like");
    this.postService.doLike(this.post.id as string).subscribe(
      res => {
        this.post.isLikedByUser = true;
        this.post.likes++;
      },
      err => this.toastr.warning("somthing went wrong!try again later...")
    );
  }

  onUnLike() {
    console.log("unLike");
    this.postService.unLike(this.post.id as string).subscribe(
      res => {
        this.post.isLikedByUser = false;
        this.post.likes--;
      },
      err => this.toastr.warning("somthing went wrong!try again later...")
    );
  }

  onSwitchLike() {
    this.post.isLikedByUser ? this.onUnLike() : this.onLike();
  }

  handleError(error): void {
    switch (error.status) {
      case 401:
        this.toastr.warning("please login...");
        this.navigateService.navigate("/home/login");
        break;
      case 404:
        this.toastr.warning("page not found...");
        this.navigateService.navigate("/posts");
        break;
      default:
        this.toastr.warning("somthing went wrong!try again later...");
        break;
    }
  }
}
