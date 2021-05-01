import {Component, HostListener, OnInit} from '@angular/core';
import {BaseAppService} from '../../../../../libs/src/lib/base-app/base-app.service';
import {CalendarService, SpeedSlotCreateMode} from '../calendar-service/calendar.service';
import {CalendarViewService} from '../calendar-service/calendar-view.service';
import {AbstractCalendarComponent} from './abstract-calendar.component';
import {CalendarDialogService} from '../calendar-service/calendar-dialog.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends AbstractCalendarComponent implements OnInit {

  constructor(public app: BaseAppService, public calendar: CalendarService, public view: CalendarViewService,
              public dialog: CalendarDialogService) {
    super(app, calendar, view);
  }

  ngOnInit(): void {
    this.app.page = this.app.titles.calendar;
    this.app.showToolbarMenu = true;
    this.calendar.updateSlotsAndCalendarAndWait(
      this.view.getPlannerSettings().weeksPast, this.view.getPlannerSettings().weeksFuture).subscribe(() => {
      this.view.setViewModeHard(this.view.calcAutoViewMode());
      this.view.changeEvent.subscribe(() => this.onResize());
    });
  }

  showSlotCreateToolbar(width: number): boolean {
    if (this.app.calcContentWidth() > width) {
      return true;
    }
    this.calendar.speedSlotCreateMode = SpeedSlotCreateMode.DISABLED;
    return false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (this.view.autoViewMode && this.calendar.isCalendarInit()) {
      this.view.viewMode = this.view.calcAutoViewMode();
    }
  }

}
