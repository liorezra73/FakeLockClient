import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/common/services/post-service.service";
import { IPostService } from "src/app/common/intefaces/post-service.inteface";
import { Router, ActivatedRoute } from "@angular/router";
import { Post } from "src/app/common/models/Post";
import { IPhotoService } from "src/app/common/intefaces/photo.service.interface";
import { PhotoService } from "src/app/common/services/photo.service";
import { OrderBy } from "src/app/common/enums/orderBy";

@Component({
  selector: "app-post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {
  postId: number;
  post: Post;
  postService: IPostService;
  photoService: IPhotoService;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    postService: PostService,
    photoSerice: PhotoService
  ) {
    this.postService = postService;
    this.photoService = photoSerice;
    this.activatedRoute.params.subscribe(
      res => (this.postId = parseInt(res.postId))
    );
  }

  like() {
    this.postService.deletePost(10013).subscribe(
      res => {},
      err => console.log(err)
    );
  }
  ngOnInit() {
    this.getPostById(this.postId);
  }

  getPostById(postId: number) {
    this.postService.getPostById(postId).subscribe(
      post => {
        this.post = post;
        this.post.photo = this.photoService.getPhotoByPhotoId(
          this.post.photo as string
        );
        console.log(this.post);
      },
      err => this.handleError(err)
    );
  }

  onLike() {
    console.log("Like");
    this.postService.doLike(this.post.id).subscribe(res => {
      this.post.isLikedByUser = true;
      this.post.likes++;
   
    },err=>this.handleError(err));
  }

  onUnLike() {
    console.log("unLike");
    this.postService.unLike(this.post.id).subscribe(res => {
      this.post.isLikedByUser = false;
      this.post.likes--;
    });
  }

  onSwitchLike() {
    this.post.isLikedByUser ? this.onUnLike() : this.onLike();
  }

  handleError(error): void {
    switch (error.status) {
      case 0:
        alert("Connection error! Redirect to main page.");
        this.navigateMainByTimer(3000);
        break;
      case 404:
        alert("No post found! Redirect to main page. ");
        this.navigateMainByTimer(2000);
        break;
      case 400:
        alert("Already liked.");
        break;
      case 500:
        alert("Connection error! please try again later.");
      default:
        alert("Connection error! Redirect to main page");
        this.navigateMainByTimer(3000);
        break;
    }
  }

  navigateMainByTimer(time: number): void {
    setTimeout(() => {
      this.router.navigate(["posts/feed/main"]);
    }, time);
  }
}
