import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateTimePickerComponent} from './date-time-picker/date-time-picker.component';
import {TimePickerComponent} from './time-picker/time-picker.component';
import {DurationPickerComponent} from './duration-picker/duration-picker.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [DateTimePickerComponent, TimePickerComponent, DurationPickerComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonToggleModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
  ],
  exports: [DateTimePickerComponent, TimePickerComponent, DurationPickerComponent]
})
export class DateTimePickerModule {
}
