import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingAnonymComponent} from './booking/booking-anonym/booking-anonym.component';
import {BookingAuthComponent} from './booking/booking-auth/booking-auth.component';
import {BaseAppModule} from '../../../../libs/src/lib/base-app/base-app.module';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ProgressSpinnerModule} from '../../../../libs/src/lib/progress-spinner/progress-spinner.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AgendaComponent} from './agenda/agenda.component';
import {EAppModule} from '../../../../libs/src/lib/e-app/e-app.module';
import {AgendaAppointmentItemComponent} from './agenda/agenda-appointment-item/agenda-appointment-item.component';
import {ChoosePersonComponent} from './booking/steps/choose-person/choose-person.component';
import {ChooseSlotComponent} from './booking/steps/choose-slot/choose-slot.component';
import {BookingStepperComponent} from './booking/booking-stepper/booking-stepper.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {InputDataComponent} from './booking/steps/input-data/input-data.component';
import {BookingSubmitComponent} from './booking/steps/booking-submit/booking-submit.component';
import {ChooseSlotFilterComponent} from './booking/steps/choose-slot/choose-slot-filter/choose-slot-filter.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AppointmentDetailsDialogComponent} from './appointment-details-dialog/appointment-details-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AppointmentDeleteAlertComponent} from './appointment-delete-alert/appointment-delete-alert.component';
import {ChooseSlotFilterSideComponent} from './booking/steps/choose-slot/choose-slot-filter/choose-slot-filter-side/choose-slot-filter-side.component';


@NgModule({
  declarations: [BookingAnonymComponent, AgendaComponent, BookingAuthComponent, AgendaAppointmentItemComponent, ChoosePersonComponent,
    ChooseSlotComponent, BookingStepperComponent, InputDataComponent, BookingSubmitComponent, ChooseSlotFilterComponent,
    AppointmentDetailsDialogComponent,
    AppointmentDeleteAlertComponent,
    ChooseSlotFilterSideComponent],
  imports: [
    CommonModule,
    BaseAppModule,
    ProgressSpinnerModule,
    EAppModule,
    MatCardModule,
    ScrollingModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatInputModule,
    MatTabsModule,
    NgxSliderModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatTooltipModule,
    MatDialogModule,
  ]
})
export class BookingModule {
}
