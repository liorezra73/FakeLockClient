import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/common/services/post-service.service";
import { IPostService } from "src/app/common/intefaces/post-service.inteface";
import { Post, Tag } from "src/app/common/models/post";
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl
} from "@angular/forms";
import { IUserService } from "src/app/common/intefaces/user-service.inteface";
import { UserService } from "src/app/common/services/user.service";
import { Observable } from "rxjs";
import { User } from "src/app/common/models/User";
import { stringValidation } from "src/app/common/validations/formControl.string.validation";
import { formControlTouchOrDirty } from "src/app/common/validations/formControlTouchOrDirty";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.css"]
})
export class PostFormComponent implements OnInit {
  postService: IPostService;
  userService: IUserService;
  post: Post;
  postTags: Tag[] = [];
  //need to get users to search in tage users input;
  postUserTags: User[] = [];
  postForm: FormGroup;
  users: User[];

  constructor(postService: PostService, userService: UserService) {
    this.postService = postService;
    this.userService = userService;
  }

  ngOnInit() {
    this.initializePost();
    this.initializePostForm();
    this.userService.getUsers().subscribe(data => (this.users = data));
    // this.userService.getUsers().subscribe(res=>console.log(res));
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
      this.postService.createPost({ ...this.post });
      this.initializePost();
      this.initializePostForm();
    } else {
      alert("form not valid!");
    }
  }
}
