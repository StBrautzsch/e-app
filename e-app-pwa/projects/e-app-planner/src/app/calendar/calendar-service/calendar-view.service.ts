import {EventEmitter, Injectable} from '@angular/core';
import {BaseAppService} from '../../../../../libs/src/lib/base-app/base-app.service';
import {t, TimeTools} from '../../../../../libs/src/lib/time-tools';
import {CalendarService} from './calendar.service';
import {CalendarItem} from './calendar-item';
import {AccountService} from '../../../../../libs/src/lib/account/account-service/account-service';
import {PlannerSettings, WeekdayMode} from '../../../../../libs/src/lib/data/user-settings';

export enum CalendarViewMode {DAY_3, WEEK_1, WEEK_2, WEEK_3, WEEK_4}

export const dayCountPerViewMode = {
  DAY_3: 3,
  WEEK_1: t.DAY_PER_WEEK,
  WEEK_2: t.DAY_PER_WEEK * 2,
  WEEK_3: t.DAY_PER_WEEK * 3,
  WEEK_4: t.DAY_PER_WEEK * 4,
};

@Injectable({
  providedIn: 'root'
})
export class CalendarViewService {

  slotWidthHeaderS = 20;
  slotWidthHeaderL = 40;

  slotHeight = 40;
  slotWidthHeader = this.slotWidthHeaderS;
  slotWidthData = 80;
  margin = 5;

  private _start: Date;
  private _viewMode: CalendarViewMode;
  autoViewMode = true;
  private _personalised = true;
  private _days: CalendarItem[];
  private _realDayCount = 0;
  private _mondayCount = 0;
  private _containerWidth = 0;

  grid = true;

  changeEvent = new EventEmitter();

  constructor(private app: BaseAppService, private calender: CalendarService, private account: AccountService) {
    console.log('CalendarViewService');
    this.app.sidenavChangeEvent.subscribe(() => this.changeEvent.emit());
  }

  updateDays(): void {
    this.generateDays();
    this.countMondays();
    this.calcContainerWidth();
  }

  private generateDays(): void {
    const days: CalendarItem[] = [];
    let count = this.calcDayCountForViewMode();
    let time = new Date(this.start.getTime());
    while (days.length < count) {
      if (this.showDay(time)) {
        days.push(this.calender.calendar[this.calender.timeToIndex(time)]);
      } else {
        if (!this.isDayMode()) {
          count--;
        }
      }
      time = TimeTools.getDateWithZeroTime(new Date(time.getTime() + t.MS_PER_DAY + (t.MS_PER_HOUR * 3)));
    }
    this._realDayCount = days.length;
    this._days = days;
  }

  private countMondays(): void {
    let count = 0;
    for (const d of this.days) {
      if (d.time.getDay() === 1) {
        count++;
      }
    }
    this._mondayCount = count;
  }

  isDayMode(): boolean {
    if (this.viewMode === CalendarViewMode.DAY_3) {
      return true;
    }
    return false;
  }

  showDay(day: Date): boolean {
    if (!this.personalised || this.getPlannerSettings().weekdayMode === WeekdayMode.ALL) {
      return true;
    }
    if (this.getPlannerSettings().weekdayMode === WeekdayMode.HIDE_WE && (day.getDay() === 6 || day.getDay() === 0)) {
      return false;
    }
    if (this.getPlannerSettings().weekdayMode === WeekdayMode.HIDE_SU && day.getDay() === 0) {
      return false;
    }
    return true;
  }

  showHour(h: number): boolean {
    if (!this.personalised ||
      (h >= this.account.castPlanner().user.settings.hourFrom && h < this.account.castPlanner().user.settings.hourTo)) {
      return true;
    }
    return false;
  }

  private calcDayCountForViewMode(): number {
    if (this.viewMode === CalendarViewMode.DAY_3) {
      return dayCountPerViewMode.DAY_3;
    }
    if (this.viewMode === CalendarViewMode.WEEK_1) {
      return dayCountPerViewMode.WEEK_1;
    }
    if (this.viewMode === CalendarViewMode.WEEK_2) {
      return dayCountPerViewMode.WEEK_2;
    }
    if (this.viewMode === CalendarViewMode.WEEK_3) {
      return dayCountPerViewMode.WEEK_3;
    }
    if (this.viewMode === CalendarViewMode.WEEK_4) {
      return dayCountPerViewMode.WEEK_4;
    }
  }

  calcAutoViewMode(): CalendarViewMode {
    const add = +33 + 24 + 2;
    if (this.app.calcContentWidth() > 2482 + add) {
      return CalendarViewMode.WEEK_4;
    }
    if (this.app.calcContentWidth() > 1877 + add) {
      return CalendarViewMode.WEEK_3;
    }
    if (this.app.calcContentWidth() > 1272 + add) {
      return CalendarViewMode.WEEK_2;
    }
    if (this.app.calcContentWidth() > 667 + add) {
      return CalendarViewMode.WEEK_1;
    }
    return CalendarViewMode.DAY_3;
  }

  private calcContainerWidth(): void {
    let mondayCount = this.mondayCount;
    if (this.start.getDay() === 1) {
      mondayCount--;
    }
    let hour = 1;
    if (!this.isDayMode()) {
      hour++;
    }
    this._containerWidth = this.realDayCount * (this.slotWidthData + this.margin)
      + (mondayCount * (this.margin * 2))
      + (this.slotWidthHeader + this.margin) * hour
      + 12;
  }

  isDateValid(d: Date): boolean {
    if ((d.getTime() >= this.calender.startTimeView.getTime()) && (d.getTime() <= this.calender.endTimeView.getTime())) {
      return true;
    }
    return false;
  }

  get start(): Date {
    return this._start;
  }

  changeStart(value: Date): boolean {
    if (this.isDateValid(value)) {
      this.calender.updateSlotsAndCalendarAndWaitWithLastPara().subscribe(
        () => {
          this._start = value;
          this.updateDays();
        });
      return true;
    }
    return false;
  }

  get viewMode(): CalendarViewMode {
    return this._viewMode;
  }

  set viewMode(value: CalendarViewMode) {
    if (this.viewMode !== value) {
      this.setViewModeHard(value);
    }
  }

  setViewModeHard(value: CalendarViewMode): void {
    this._viewMode = value;
    if (this._start === undefined) {
      this.init();
    } else {
      if (!this.isDayMode()) {
        this._start = TimeTools.getLastMonday(this._start);
      }
    }
    this.setSlotWidthHeader();
    this.updateDays();
  }

  private setSlotWidthHeader(): void {
    if (this.isDayMode()) {
      this.slotWidthHeader = this.slotWidthHeaderS;
    } else {
      this.slotWidthHeader = this.slotWidthHeaderL;
    }
  }

  private init(): void {
    if (this.isDayMode()) {
      this._start = TimeTools.getDateWithZeroTime(new Date());
    } else {
      this._start = TimeTools.getLastMonday(new Date());
    }
  }

  get personalised(): boolean {
    return this._personalised;
  }

  set personalised(value: boolean) {
    this._personalised = value;
    this.updateDays();
  }

  get realDayCount(): number {
    return this._realDayCount;
  }

  get mondayCount(): number {
    return this._mondayCount;
  }

  get days(): CalendarItem[] {
    return this._days;
  }

  get containerWidth(): number {
    return this._containerWidth;
  }

  getPlannerSettings(): PlannerSettings {
    return this.account.castPlanner().user.settings;
  }

}
