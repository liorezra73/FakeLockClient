import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/common/services/post-service.service";
import { IPostService } from "src/app/common/intefaces/post-service.inteface";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {
  postId: number;
  service: IPostService;

  constructor(
    service: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.service = service;
    this.activatedRoute.params.subscribe(
      res => (this.postId = parseInt(res.postId))
    );
  }

  ngOnInit() {
    this.service.getPostById(10013).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
    this.service.getPostsOrderByDates().subscribe(
      res=> console.log(res),
      err => console.log(err)
    )
  }
}
