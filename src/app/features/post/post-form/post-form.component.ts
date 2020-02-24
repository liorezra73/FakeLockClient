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
import { stringValidation } from "src/app/common/validations/formControl.string.validation";
import { formControlTouchOrDirty } from "src/app/common/validations/formControlTouchOrDirty";
import { INavigateService } from "src/app/shared/interfaces/navigate.service.interface";
import { NavigateService } from "src/app/shared/services/navigate.service";
import { LocationService } from "src/app/common/services/location.service";
import { ILocationService } from "src/app/common/intefaces/location.service.interface";
import { MapLocation } from "src/app/common/models/MapLocation";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.css"]
})
export class PostFormComponent implements OnInit {
  postService: IPostService;
  post: Post;
  postForm: FormGroup;
  navigateService: INavigateService;
  locationService: ILocationService;

  constructor(
    postService: PostService,
    navigateService: NavigateService,
    locationService: LocationService
  ) {
    this.postService = postService;
    this.navigateService = navigateService;
    this.locationService = locationService;
  }

  ngOnInit() {
    this.initializeAll();
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
          this.post.location.longtitude,
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
        res => {
          this.navigateService.navigate(`/posts/${res.Id}`);
          this.initializeAll();
        },
        err => {
          switch (err.status) {
            case 400:
              alert("form not valid!");
              break;
            case 401:
              this.navigateService.navigate("/home/login");
              break;
            case 406:
              alert("image size is too large");
              break;
            default:
              console.log(err);

              alert("something went wrong!please try again later...");
              break;
          }
        }
      );
    } else {
      alert("form not valid!");
    }
  }

  initializeAll(): void {
    this.initializePost();
    this.locationService.getCurrentLocation().subscribe(
      (res: MapLocation) => {
        this.post.location = {
          latitude: res.latitude,
          longtitude: res.longtitude
        };
      },
      err => {
        this.post.location = {
          latitude: 32.0970604,
          longtitude: 34.826543799999996
        };
      },
      () => {
        this.initializePostForm();
      }
    );
  }
}
