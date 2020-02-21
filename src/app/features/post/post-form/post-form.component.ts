import { Component, OnInit, DoCheck } from "@angular/core";
import { PostService } from "src/app/common/services/post-service.service";
import { IPostService } from "src/app/common/intefaces/post-service.inteface";
import { Post } from "src/app/common/models/post";
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl
} from "@angular/forms";
import { UserService } from "src/app/common/services/user.service";
import { stringValidation } from "src/app/common/validations/formControl.string.validation";
import { formControlTouchOrDirty } from "src/app/common/validations/formControlTouchOrDirty";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.css"]
})
export class PostFormComponent implements OnInit, DoCheck {
  postService: IPostService;
  post: Post;
  postForm: FormGroup;

  constructor(postService: PostService) {
    this.postService = postService;
  }

  ngOnInit() {
    this.initializePost();
    this.getCurrentLocation();
  }

  ngDoCheck(): void {
    this.initializePostForm();
  }
  initializePost() {
    this.post = {
      text: "",
      location: {
        latitude: 0,
        longtitude: 0
      },
      photo: null,
      usersTags: [],
      tags: []
    };
  }
  //need to sepraet code that repeats himself
  initializePostForm() {
    this.postForm = new FormGroup({
      text: new FormControl(this.post.text, stringValidation(3, 200)),
      location: new FormGroup({
        latitude: new FormControl(
          this.post.location.latitude,
          Validators.compose([
            Validators.required,
            Validators.min(-90),
            Validators.max(90)
          ])
        ),
        longtitude: new FormControl(
          this.post.location.latitude,
          Validators.compose([
            Validators.required,
            Validators.min(-180),
            Validators.max(180)
          ])
        )
      }),
      photo: new FormControl(this.post.photo, Validators.required),
      tags: new FormControl(this.post.tags),
      usersTags: new FormControl(this.post.usersTags)
    });
  }

  formControlTouchOrDirty(formControl: AbstractControl) {
    return formControlTouchOrDirty(formControl);
  }

  savePost() {
    if (this.postForm.valid) {
      this.post = this.postForm.value;
      this.postService.createPost({ ...this.post }).subscribe(
        res => console.log(res),
        err => console.log(err)
      );
      this.initializePost();
      this.initializePostForm();
    } else {
      alert("form not valid!");
    }
  }

  getCurrentLocation(): void {
    navigator.geolocation.getCurrentPosition(
      res => {
        this.post.location = {
          latitude: res.coords.latitude,
          longtitude: res.coords.longitude
        };
      },
      err => {
        this.post.location = {
          latitude: 32.0970604,
          longtitude: 34.826543799999996
        };
      }
    );
  }
}
