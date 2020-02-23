import { Component, OnInit } from "@angular/core";
import { Filter } from "src/app/common/models/filter";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { formControlTouchOrDirty } from 'src/app/common/validations/formControlTouchOrDirty';

@Component({
  selector: "app-post-feed-tool-bar",
  templateUrl: "./post-feed-tool-bar.component.html",
  styleUrls: ["./post-feed-tool-bar.component.css"]
})
export class PostFeedToolBarComponent implements OnInit {
  filter: Filter;
  filterForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.initializeFilter();
    this.initializeFilterForm();
  }

  initializeFilter() {
    this.filter = {
      radius: {
        location: {
          latitude: 0,
          longtitude: 0
        },
        distance: 19000
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
        latitude: new FormControl(
          this.filter.radius.location.latitude,
          Validators.compose([
            Validators.min(-90),
            Validators.max(90)
          ])
        ),
        longtitude: new FormControl(
          this.filter.radius.location.longtitude,
          Validators.compose([
            Validators.min(-180),
            Validators.max(180)
          ])
        ),
        distance: new FormControl(
          this.filter.radius.distance,
          Validators.compose([
            Validators.min(0),
            Validators.max(19000)
          ])
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

  onFilter(){
    console.log(this.filterForm.value)
  }
}
