import { Component, OnInit, DoCheck, AfterContentInit } from "@angular/core";
import { Filter } from "src/app/common/models/Flter";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { formControlTouchOrDirty } from "src/app/common/validations/formControlTouchOrDirty";
import { OrderBy } from "src/app/common/enums/orderBy";
import { IFeedService } from "src/app/shared/interfaces/feed.service.interface";
import { IPostService } from "src/app/common/intefaces/post-service.inteface";
import { PostService } from "src/app/common/services/post-service.service";
import { ILocationService } from "src/app/common/intefaces/location.service.interface";
import { LocationService } from "src/app/common/services/location.service";
import { MapLocation } from "src/app/common/models/MapLocation";

@Component({
  selector: "app-post-feed-tool-bar",
  templateUrl: "./post-feed-tool-bar.component.html",
  styleUrls: ["./post-feed-tool-bar.component.css"]
})
export class PostFeedToolBarComponent implements OnInit {
  filter: Filter;
  filterForm: FormGroup;
  postService: IPostService;
  locationService: ILocationService;
  constructor(postService: PostService, locationService: LocationService) {
    this.postService = postService;
    this.locationService = locationService;
  }

  ngOnInit() {
    this.initializeAll();
  }

  initializeFilter() {
    this.filter = {
      radius: {
        location: {
          latitude: null,
          longtitude: null
        },
        distance: null
      },
      dates: {
        startDate: null,
        endDate: null
      },
      tags: [],
      usersTags: []
    };
  }
  initializeFilterForm() {
    this.filterForm = new FormGroup({
      radius: new FormGroup({
        location: new FormGroup({
          latitude: new FormControl(
            this.filter.radius.location.latitude,
            Validators.compose([Validators.min(-90), Validators.max(90)])
          ),
          longtitude: new FormControl(
            this.filter.radius.location.longtitude,
            Validators.compose([Validators.min(-180), Validators.max(180)])
          )
        }),
        distance: new FormControl(
          this.filter.radius.distance,
          Validators.compose([Validators.min(0), Validators.max(19000)])
        )
      }),
      dates: new FormGroup({
        startDate: new FormControl(
          this.filter.dates.startDate,
          Validators.compose([])
        ),
        endDate: new FormControl(
          this.filter.dates.endDate,
          Validators.compose([])
        )
      }),
      tags: new FormControl(this.filter.tags),
      usersTags: new FormControl(this.filter.usersTags)
    });
  }

  formControlTouchOrDirty(formControl: AbstractControl) {
    return formControlTouchOrDirty(formControl);
  }

  onFilter() {
    if (this.filterForm.valid) {
      this.filter = this.filterForm.value;
      this.filter.radius.distance = this.filter.radius.distance * 1000;
      this.postService.filterPosts(OrderBy.date, { ...this.filter });
    } else {
      alert("form not valid!");
    }
  }

  initializeAll(): void {
    this.initializeFilter();
    this.locationService.getCurrentLocation().subscribe(
      (res: MapLocation) => {
        this.filter.radius.location.latitude = res.latitude;
        this.filter.radius.location.longtitude = res.longtitude;
      },
      err => {
        this.filter.radius.location.latitude = 32.0970604;
        this.filter.radius.location.longtitude = 34.826543799999996;
      },
      () => {
        this.initializeFilterForm();
      }
    );
  }
}
