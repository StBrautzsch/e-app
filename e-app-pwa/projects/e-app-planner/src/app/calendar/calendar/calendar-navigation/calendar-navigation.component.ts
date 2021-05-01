import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../../../../libs/src/lib/base-app/base-app.service';
import {CalendarService, SpeedSlotCreateMode} from '../../calendar-service/calendar.service';
import {CalendarViewService} from '../../calendar-service/calendar-view.service';
import {AbstractCalendarNavigationComponent} from '../abstract-calendar-navigation.component';
import {CalendarDialogService} from '../../calendar-service/calendar-dialog.service';

@Component({
  selector: 'app-calendar-navigation',
  templateUrl: './calendar-navigation.component.html',
  styleUrls: ['./calendar-navigation.component.scss']
})
export class CalendarNavigationComponent extends AbstractCalendarNavigationComponent implements OnInit {

  tSpeedSlotCreateMode = SpeedSlotCreateMode;

  constructor(public app: BaseAppService, public calendar: CalendarService, public view: CalendarViewService,
              public dialog: CalendarDialogService) {
    super(app, calendar, view);
  }

  ngOnInit(): void {
  }

  calcNavOffset(): number {
    if (!this.app.screen.isSmall() && this.app.isSidenavOpen()) {
      return this.app.sidenavWidth / 2;
    }
    return 0;
  }

  calcNavWidth(): number {
    return 900;
    if (!this.view.isDayMode() && this.app.screen.screenSize > 1) {
      return 324;
    }
    return 192;
  }

  cancel(): void {
    this.calendar.create = null;
    this.calendar.speedSlotCreateMode = SpeedSlotCreateMode.DISABLED;
  }

}
