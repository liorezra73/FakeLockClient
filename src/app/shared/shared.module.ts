import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { UsertagInputComponent } from './components/usertag-input/usertag-input.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [TagInputComponent, UsertagInputComponent],
  imports: [CommonModule],
  exports: [TagInputComponent,UsertagInputComponent,AutocompleteLibModule]
})
export class AppSharedModule {}
