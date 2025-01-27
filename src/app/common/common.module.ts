import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormTextInputComponent } from "./components/form-text-input/form-text-input.component";
import { FormPasswordInputComponent } from "./components/form-password-input/form-password-input.component";
import { FormInputErrorComponent } from "./components/form-input-error/form-input-error.component";
import { FormImageInputComponent } from "./components/form-image-input/form-image-input.component";
import { FormNumberInputComponent } from "./components/form-number-input/form-number-input.component";
import { FormTextAreaInputComponent } from "./components/form-text-area-input/form-text-area-input.component";
import { FormControlErrorShowComponent } from "./components/form-control-error-show/form-control-error-show.component";
import { AppSharedModule } from "../shared/shared.module";
import { FormInputDateComponent } from "./components/form-input-date/form-input-date.component";
import { MapComponent } from "./components/map/map.component";
import { AgmCoreModule } from "@agm/core";
import { FormLocationInputComponent } from './components/form-location-input/form-location-input.component';


@NgModule({
  declarations: [
    FormTextInputComponent,
    FormPasswordInputComponent,
    FormInputErrorComponent,
    FormImageInputComponent,
    FormNumberInputComponent,
    FormTextAreaInputComponent,
    FormControlErrorShowComponent,
    FormInputDateComponent,
    MapComponent,
    FormLocationInputComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAL8BDG6ls8pxalyMwXMyn4YMes5fB_Dd0",
      libraries: ["places"]
    })
  ],
  exports: [
    FormTextInputComponent,
    FormPasswordInputComponent,
    FormInputErrorComponent,
    FormImageInputComponent,
    FormNumberInputComponent,
    FormTextAreaInputComponent,
    FormControlErrorShowComponent,
    FormInputDateComponent,
    MapComponent,
    FormLocationInputComponent
  ]
})
export class AppCommonModule {}
