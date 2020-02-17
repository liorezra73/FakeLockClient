import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/common/services/post-service.service";
import { IPostService } from "src/app/common/intefaces/post-service.inteface";
import { Post, Tag } from "src/app/common/models/post";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { IUserService } from "src/app/common/intefaces/user-service.inteface";
import { UserService } from "src/app/common/services/user.service";
import { Observable } from "rxjs";
import { User } from "src/app/common/models/User";
import { stringValidation } from "src/app/common/validations/formControl.string.validation";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.css"]
})
export class PostFormComponent implements OnInit {
  postService: IPostService;
  userService: IUserService;
  postPhoto: File;
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
      usersTags: this.postUserTags,
      tags: this.postTags
    };
  }
  //need to write custom validate for location min max and num
  //need to sepraet code that repeats himself
  initializePostForm() {
    this.postForm = new FormGroup({
      text: new FormControl(this.post.text, stringValidation(3, 200)),
      location: new FormGroup({
        latitude: new FormControl(
          this.post.location.latitude,
          Validators.compose([Validators.required])
        ),
        longtitude: new FormControl(
          this.post.location.latitude,
          Validators.compose([Validators.required])
        )
      }),
      photo: new FormControl(this.postPhoto, Validators.required)
    });
  }

  onPhotoChanged(event) {
    this.postPhoto = (event.target as HTMLInputElement).files[0];
  }

  addTag(tag: HTMLInputElement) {
    if (/\S/.test(tag.value)) {
      this.postTags.push({ title: tag.value });
      tag.value = "";
    } else {
      alert("cant be empty");
    }
  }
  removeTag(index: number) {
    this.postTags = this.postTags.filter(
      p => this.postTags.indexOf(p) !== index
    );
  }

  removeUserTag(index: number) {
    this.postUserTags = this.postUserTags.filter(
      p => this.postUserTags.indexOf(p) !== index
    );
  }

  selectEvent(item) {
    this.postUserTags.push({ ...item });
    console.log(this.postUserTags);
    item = null;
  }

  savePost() {
    if (this.postPhoto && this.postPhoto.size > 0 && this.postForm.valid) {
      this.post = {
        ...this.postForm.value,
        tags: this.postTags,
        usersTags: this.postUserTags
      };
      delete this.post.photo;
      this.postService.createPost({ ...this.post }, this.postPhoto);
      this.postPhoto = null;
      this.initializePost();
      this.initializePostForm();
      console.log(this.postPhoto);
    } else {
      alert("form not valid!");
    }
  }
}
