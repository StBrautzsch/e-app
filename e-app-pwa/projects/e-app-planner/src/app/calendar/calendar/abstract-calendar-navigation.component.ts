import {BaseAppService} from '../../../../../libs/src/lib/base-app/base-app.service';
import {CalendarService} from '../calendar-service/calendar.service';
import {CalendarViewService} from '../calendar-service/calendar-view.service';
import {t, TimeTools} from '../../../../../libs/src/lib/time-tools';
import {Component} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {WeekdayMode} from '../../../../../libs/src/lib/data/user-settings';
import {SB_MSG} from '../../../../../libs/src/lib/msg';

@Component({
  template: ''
})
export abstract class AbstractCalendarNavigationComponent {

  pickDateValue: Moment;

  protected constructor(public app: BaseAppService, public calendar: CalendarService, public view: CalendarViewService) {
    this.pickDateValue = moment(this.view.start);
  }

  isTodayInView(): boolean {
    const today = TimeTools.getDateWithZeroTime(new Date(Date.now())).getTime();
    for (const d of this.view.days) {
      if (d.time.getTime() === today) {
        return true;
      }
    }
    return false;
  }

  addDays(value: Date): Date {
    let days = this.view.realDayCount;
    if (this.view.isDayMode()) {
      if (this.view.getPlannerSettings().weekdayMode === WeekdayMode.HIDE_WE) {
        days += 2;
      }
      if (this.view.getPlannerSettings().weekdayMode === WeekdayMode.HIDE_SU) {
        days++;
      }
    }
    return new Date(value.getTime() + days * t.MS_PER_DAY - 1);
  }

  changeStart(value: Date): boolean {
    if (this.view.changeStart(value)) {
      return true;
    }
    this.app.dialog.showSnackBar(SB_MSG.ERROR_CALENDAR_NAV);
    return false;
  }

  pickDate(): void {
    if (this.view.isDayMode()) {
      this.changeStart(new Date(this.pickDateValue.toDate().getTime() - t.MS_PER_DAY));
    } else {
      this.changeStart(TimeTools.getLastMonday(new Date(this.pickDateValue.toDate())));
    }
  }

  lastMonday(): void {
    this.changeStart(TimeTools.getLastMonday(this.view.start));
    this.pickDateValue = moment(this.view.start);
  }

  today(): void {
    if (this.view.isDayMode()) {
      this.changeStart(TimeTools.getDateWithZeroTime(new Date(Date.now())));
    } else {
      this.changeStart(TimeTools.getLastMonday(new Date(Date.now())));
    }
    this.pickDateValue = moment(this.view.start);
  }

  nextDay(): void {
    this.changeStart(this.calcNextDay());
    this.pickDateValue = moment(this.view.start);
  }

  calcNextDay(): Date {
    return new Date(this.view.start.getTime() + t.MS_PER_DAY);
  }

  nextWeek(): void {
    this.changeStart(this.calcNextWeek());
    this.pickDateValue = moment(this.view.start);
  }

  calcNextWeek(): Date {
    return new Date(this.view.start.getTime() + t.DAY_PER_WEEK * t.MS_PER_DAY);
  }

  lastDay(): void {
    this.changeStart(this.calcLastDay());
    this.pickDateValue = moment(this.view.start);
  }

  calcLastDay(): Date {
    return new Date(this.view.start.getTime() - t.MS_PER_DAY);
  }

  lastWeek(): void {
    this.changeStart(this.calcLastWeek());
    this.pickDateValue = moment(this.view.start);
  }

  calcLastWeek(): Date {
    return new Date(this.view.start.getTime() - t.DAY_PER_WEEK * t.MS_PER_DAY);
  }

}
