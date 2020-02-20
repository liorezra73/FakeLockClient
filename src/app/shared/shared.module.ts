import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { UsertagInputComponent } from './components/usertag-input/usertag-input.component';

@NgModule({
  declarations: [TagInputComponent, UsertagInputComponent],
  imports: [CommonModule],
  exports: [TagInputComponent,UsertagInputComponent]
})
export class AppSharedModule {}
