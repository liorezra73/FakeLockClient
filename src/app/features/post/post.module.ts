import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostFormComponent } from "./post-form/post-form.component";
import { PostMainFeedComponent } from "./post-main-feed/post-main-feed.component";
import { PostMapFeedComponent } from "./post-map-feed/post-map-feed.component";
import { PostFeedToolBarComponent } from "./post-feed-tool-bar/post-feed-tool-bar.component";
import { PostCardComponent } from "./post-card/post-card.component";
import { PostDetailsComponent } from "./post-details/post-details.component";
import { PostLayoutFeedComponent } from "./post-layout-feed/post-layout-feed.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { PostLayoutComponent } from "./post-layout/post-layout.component";
import { PostRoutingModule } from "src/app/shared/routes/post-routing.module";
import { AppCommonModule } from 'src/app/common/common.module';

@NgModule({
  declarations: [
    PostFormComponent,
    PostMainFeedComponent,
    PostMapFeedComponent,
    PostFeedToolBarComponent,
    PostCardComponent,
    PostDetailsComponent,
    PostLayoutFeedComponent,
    PostLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PostRoutingModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    AppCommonModule
  ],
  exports: [
    PostFormComponent,
    PostMainFeedComponent,
    PostMapFeedComponent,
    PostFeedToolBarComponent,
    PostCardComponent,
    PostDetailsComponent,
    PostLayoutFeedComponent
  ]
})
export class PostModule {}
