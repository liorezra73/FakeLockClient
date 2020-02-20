import { Component, OnInit, Input } from "@angular/core";
import { Post } from "src/app/common/models/post";
import { PhotoService } from 'src/app/common/services/photo.service';
import { IPhotoService } from 'src/app/common/intefaces/photo.service.interface';

@Component({
  selector: "app-post-card",
  templateUrl: "./post-card.component.html",
  styleUrls: ["./post-card.component.css"]
})
export class PostCardComponent implements OnInit {
  @Input()
  post: Post;
  photoService: IPhotoService
  constructor(photoSerice:PhotoService) {
    this.photoService = photoSerice;
  }

  ngOnInit() {
    this.post.photo = this.photoService.getPhotoByPhotoId(this.post.photo as string);
  }
}
