import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/common/services/post-service.service";
import { IPostService } from "src/app/common/intefaces/post-service.inteface";
import { Router, ActivatedRoute } from "@angular/router";
import { IPhotoService } from "src/app/common/intefaces/photo.service.interface";
import { PhotoService } from "src/app/common/services/photo.service";
import { OrderBy } from 'src/app/common/enums/orderBy';

@Component({
  selector: "app-post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {
  postId: number;
  postService: IPostService;
  photoService: IPhotoService;

  constructor(
    postService: PostService,
    photoService: PhotoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.postService = postService;
    this.photoService = photoService;
    this.activatedRoute.params.subscribe(
      res => (this.postId = parseInt(res.postId))
    );
  }

  ngOnInit() {
    this.postService
      .getPostById(20018)
      .subscribe(res =>
       console.log(this.photoService.getPhotoByPhotoId(res.photo as string)) 
      );
    this.postService.getPosts(OrderBy.likes).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }
}
