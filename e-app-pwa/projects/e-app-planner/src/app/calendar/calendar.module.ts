import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgendaComponent} from './agenda/agenda.component';
import {CalendarComponent} from './calendar/calendar.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CalendarViewComponent} from './calendar/calendar-view/calendar-view.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatTooltipModule} from '@angular/material/tooltip';
import {HourLabelComponent} from './calendar/calendar-view/hour-label/hour-label.component';
import {DayLabelComponent} from './calendar/calendar-view/day-label/day-label.component';
import {CalendarDaysComponent} from './calendar/calendar-view/calendar-days/calendar-days.component';
import {CalendarItemComponent} from './calendar/calendar-view/calendar-days/calendar-item/calendar-item.component';
import {ProgressSpinnerModule} from '../../../../libs/src/lib/progress-spinner/progress-spinner.module';
import {CalendarToolbarMenuComponent} from './calendar/calendar-toolbar-menu/calendar-toolbar-menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {SlotDetailsDialogComponent} from './slot-details-dialog/slot-details-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {SlotEditDialogComponent} from './slot-edit-dialog/slot-edit-dialog/slot-edit-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DateTimePickerModule} from '../../../../libs/src/lib/date-time-picker/date-time-picker.module';
import {MatTabsModule} from '@angular/material/tabs';
import {BaseAppModule} from '../../../../libs/src/lib/base-app/base-app.module';
import {SlotCreateDialogComponent} from './slot-edit-dialog/slot-create-dialog/slot-create-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {CalendarNavigationComponent} from './calendar/calendar-navigation/calendar-navigation.component';
import {SlotCreateToolbarComponent} from './calendar/slot-create-toolbar/slot-create-toolbar.component';
import {SlotActionComponent} from './calendar/calendar-view/calendar-days/calendar-item/slot-action/slot-action.component';
import {CalendarItemInfoComponent} from './calendar/calendar-view/calendar-days/calendar-item/calendar-item-info/calendar-item-info.component';
import {AgendaSlotItemComponent} from './agenda/agenda-slot-item/agenda-slot-item.component';
import {AgendaToolbarMenuComponent} from './agenda/agenda-toolbar-menu/agenda-toolbar-menu.component';
import {EAppModule} from '../../../../libs/src/lib/e-app/e-app.module';
import {SlotMoveAlertDialogComponent} from './slot-move-alert-dialog/slot-move-alert-dialog.component';
import {SlotDeleteAlertDialogComponent} from './slot-delete-alert-dialog/slot-delete-alert-dialog.component';


@NgModule({
  declarations: [
    AgendaComponent, CalendarComponent, CalendarViewComponent, HourLabelComponent, DayLabelComponent, CalendarDaysComponent,
    CalendarItemComponent, CalendarToolbarMenuComponent, SlotDetailsDialogComponent, SlotEditDialogComponent, SlotCreateDialogComponent,
    SlotCreateDialogComponent, CalendarNavigationComponent, SlotCreateToolbarComponent, SlotActionComponent, CalendarItemInfoComponent,
    AgendaSlotItemComponent, AgendaToolbarMenuComponent, SlotMoveAlertDialogComponent, SlotDeleteAlertDialogComponent
  ],
  imports: [
    CommonModule,
    BaseAppModule,
    DateTimePickerModule,
    ProgressSpinnerModule,
    EAppModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    DragDropModule,
    ScrollingModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTabsModule,
    MatRadioModule,
    MatSelectModule,
  ],
  exports: [CalendarToolbarMenuComponent, AgendaToolbarMenuComponent]
})
export class CalendarModule {
}
