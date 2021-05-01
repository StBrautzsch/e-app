import {BaseAppService} from '../../../../../libs/src/lib/base-app/base-app.service';
import {CalendarService} from '../calendar-service/calendar.service';
import {CalendarViewService} from '../calendar-service/calendar-view.service';
import {NORMAL_DAY, t, TimeTools, WEEKDAYS_GER} from '../../../../../libs/src/lib/time-tools';
import {Component} from '@angular/core';
import {AbstractCalendarNavigationComponent} from './abstract-calendar-navigation.component';

@Component({
  template: ''
})
export abstract class AbstractCalendarComponent extends AbstractCalendarNavigationComponent {

  now: Date = new Date(NORMAL_DAY.getTime());
  daySlots: number[];

  protected constructor(public app: BaseAppService, public calendar: CalendarService, public view: CalendarViewService) {
    super(app, calendar, view);
    this.initDaySlots();
  }

  initDaySlots(): void {
    this.daySlots = [];
    for (let i = 0; i < (t.MS_PER_DAY / this.calendar.interval); i++) {
      this.daySlots.push(i * this.calendar.interval);
    }
  }

  slotIndexToTime(slotIndex: number, date: Date): Date {
    return (new Date(date.getTime() + this.daySlots[slotIndex]));
  }

  isPast(slotIndex: number, date: Date): boolean {
    if (this.slotIndexToTime(slotIndex, date).getTime() < (new Date()).getTime()) {
      return true;
    }
    return false;
  }

  calcHour(slotIndex: number): number {
    return this.slotIndexToTime(slotIndex, TimeTools.getDateWithZeroTime()).getHours();
  }

  calcHour2(slotIndex: number, day: Date): number {
    return this.slotIndexToTime(slotIndex, TimeTools.getDateWithZeroTime(day)).getHours();
  }

  calcMin(slotIndex: number): number {
    return this.slotIndexToTime(slotIndex, TimeTools.getDateWithZeroTime()).getMinutes();
  }

  calcDate(slotIndex: number, day: Date): Date {
    return new Date(day.getFullYear(), day.getMonth(), day.getDate(), this.calcHour(slotIndex), this.calcMin(slotIndex));
  }

  getWeekDayName(date: Date): string {
    return WEEKDAYS_GER[date.getDay()];
  }

  isSameDay(d1: Date, d2: Date): boolean {
    return TimeTools.isSameDay(d1, d2);
  }

  isWeekday(day: Date): boolean {
    return TimeTools.isWeekday(day);
  }

  isSunday(day: Date): boolean {
    return TimeTools.isSunday(day);
  }

  isSaturday(day: Date): boolean {
    return TimeTools.isSaturday(day);
  }

  calcDayMargin(day: Date, i: number): number {
    if (day.getDay() === 1 && i !== 0) {
      return this.view.margin * 2;
    }
    return 0;
  }

  getMargin(isLast: boolean): number {
    if (isLast) {
      return 0;
    }
    return this.view.margin;
  }

}
