import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagInputComponent } from "./components/tag-input/tag-input.component";
import { UsertagInputComponent } from "./components/usertag-input/usertag-input.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [TagInputComponent, UsertagInputComponent, ],
  imports: [
    CommonModule,
    NgbModule,
   
  ],
  exports: [TagInputComponent, UsertagInputComponent]
})
export class AppSharedModule {}
