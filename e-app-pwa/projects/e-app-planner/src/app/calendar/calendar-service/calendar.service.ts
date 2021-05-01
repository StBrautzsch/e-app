import {Injectable} from '@angular/core';
import {BaseAppService} from '../../../../../libs/src/lib/base-app/base-app.service';
import {CalendarItem} from './calendar-item';
import {t, TimeTools} from '../../../../../libs/src/lib/time-tools';
import {SlotMoveEventData, SlotPlannerService} from './slot-planner.service';
import {Slot, SlotCreateRaw} from '../../../../../libs/src/lib/data/slot';
import {AgendaService} from '../../../../../libs/src/lib/e-app/agenda/agenda.service';
import {AgendaItemSlot} from '../../../../../libs/src/lib/e-app/agenda/agenda-item';
import {Observable, Observer} from 'rxjs';
import {observerNextAndComplete} from '../../../../../libs/src/lib/tools';

export const MIN_FUTURE_WEEKS = 3;

export enum SpeedSlotCreateMode {DISABLED, ACTIVE_15, ACTIVE_30, ACTIVE_60}

export enum AgendaMode {All, Booked, Free}

@Injectable({
  providedIn: 'root'
})
export class CalendarService extends AgendaService implements AgendaService {
  private _startTime: Date;
  private _startTimeView: Date;
  private _endTime: Date;
  private _endTimeView: Date;
  private _interval = t.MS_PER_MIN * 15;

  calendar: CalendarItem[];
  agenda: AgendaItemSlot[];

  private _agendaMode = AgendaMode.All;
  speedSlotCreateMode = SpeedSlotCreateMode.DISABLED;
  create: CalendarItem = null;
  drag = false;

  private _lastWeeksPast: number;
  private _lastWeeksFuture: number;

  constructor(private app: BaseAppService, private slots: SlotPlannerService) {
    super();
    console.log('CalendarService');
    this.initEvents();
  }

  private initEvents(): void {
    this.app.toolbarRefresh.subscribe(() =>
      this.updateSlotsAndCalendarAndWaitWithLastPara().subscribe());
    this.slots.moveSlotEvent.subscribe((data: SlotMoveEventData) =>
      this.moveSlotOnCalendar(data.slot, data.newStart, data.newDuration));
    this.slots.addSlotEvent.subscribe((slot: Slot) =>
      this.addSlotToCalendar(slot, false));
  }

  isCalendarInit(): boolean {
    if (!!this.calendar) {
      return true;
    }
    return false;
  }

  getSpeedCreateSlotDuration(): number {
    if (this.speedSlotCreateMode === SpeedSlotCreateMode.ACTIVE_15) {
      return 15;
    }
    if (this.speedSlotCreateMode === SpeedSlotCreateMode.ACTIVE_30) {
      return 30;
    }
    if (this.speedSlotCreateMode === SpeedSlotCreateMode.ACTIVE_60) {
      return 60;
    }
    return 0;
  }

  isSpeedSlotMode(): boolean {
    if (this.speedSlotCreateMode === SpeedSlotCreateMode.DISABLED) {
      return false;
    }
    return true;
  }

  createSlotsMultiple(start: Date, duration: number, slotDuration: number, slotBreak: number): void {
    const slots = this.createSlotsMultipleRawData(duration, slotDuration, slotBreak, start);
    this.slots.createSlots(slots).subscribe(
      (ret) => ret.forEach(s => {
        this.addSlotToCalendar(s, false);
        this.slots.slots.push(s);
      }),
      () => this.errorRefresh());
  }

  private createSlotsMultipleRawData(duration: number, slotDuration: number, slotBreak: number, start: Date): SlotCreateRaw[] {
    const slots: SlotCreateRaw[] = [];
    for (let i = 0; i < duration; i = i + slotDuration + slotBreak) {
      if (this.isRangeFree(this.createDummySlot(0, new Date(0)), start, slotDuration)) {
        slots.push({duration: slotDuration, start});
      }
      start = new Date(start.getTime() + slotDuration * t.MS_PER_MIN + slotBreak * t.MS_PER_MIN);
    }
    return slots;
  }

  createSlot(start: Date, duration: number): void {
    this.createSlotsMultiple(start, duration, duration, 0);
  }

  createDummySlot(slotDuration: number, slotStart: Date): Slot {
    return new Slot({
      bookingClientMail: '',
      bookingClientName: '',
      bookingClientPreName: '',
      bookingClientTel: '',
      bookingRemark: '',
      clientAnonym: false,
      clientAuth: false,
      duration: slotDuration,
      free: true,
      id: -1,
      start: slotStart.toISOString()
    });
  }

  deleteSlot(slot: Slot, notify: boolean): void {
    slot.changing = true;
    this.slots.deleteSlot(slot, notify).subscribe(
      () => {
        this.deleteSlotFromCalendar(slot);
        this.slots.removeSlotFromSlots(slot.id);
      },
      () => this.errorRefresh());
  }

  moveSlot(slot: Slot, startNew: Date, durationNew: number, notify: boolean): void {
    slot.changing = true;
    this.slots.moveSlot(slot, startNew, durationNew, notify).subscribe(
      () => this.moveSlotOnCalendar(slot, startNew, durationNew),
      () => this.errorRefresh());
  }

  private moveSlotOnCalendar(slot: Slot, startNew: Date, durationNew: number): void {
    this.deleteSlotFromCalendar(slot);
    slot.updateTime(startNew, durationNew);
    this.addSlotToCalendar(slot, false);
    slot.changing = false;
  }

  private deleteSlotFromCalendar(slot: Slot): void {
    const itemIndex = this.timeToIndex(slot.start);
    for (let i = 0; i < this.calcCalendarItemCount(slot); i++) {
      if (itemIndex < this.calendar.length) {
        this.calendar[itemIndex + i].slot = null;
        this.calendar[itemIndex].slotStart = true;
      }
    }
    this.updateAgenda();
  }

  private calcCalendarItemCount(slot: Slot): number {
    return slot.duration * t.MS_PER_MIN / this._interval;
  }

  isRangeFree(slot: Slot, startTime: Date, duration: number): boolean {
    if (duration <= 0) {
      return false;
    }
    let ret = true;
    const index = this.timeToIndex(startTime);
    for (let i = 0; i < duration / 15; i++) {
      if ((this.calendar[index + i].slot !== slot) && (this.calendar[index + i].isSlot())) {
        ret = false;
      }
    }
    return ret;
  }

  updateSlotsAndCalendar(weeksPast: number, weeksFuture: number): void {
    this.updateSlotsAndCalendarAndWait(weeksPast, weeksFuture).subscribe();
  }

  updateSlotsAndCalendarAndWaitWithLastPara(): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      if (this.slots.updateRequired) {
        this.updateSlotsAndCalendarAndWait(this._lastWeeksPast, this._lastWeeksFuture)
          .subscribe(() => observerNextAndComplete(observer, true));
      } else {
        observerNextAndComplete(observer, false);
      }
    });
  }

  updateSlotsAndCalendarAndWait(weeksPast: number, weeksFuture: number): Observable<boolean> {
    this.checkAndSaveWeeks(weeksFuture, weeksPast);
    return new Observable((observer: Observer<boolean>) => {
      if (!this._updating) {
        this.update(this._lastWeeksPast, this._lastWeeksFuture, observer);
      } else {
        observerNextAndComplete(observer, false);
      }
    });
  }

  private checkAndSaveWeeks(weeksFuture: number, weeksPast: number): void {
    if (weeksFuture < MIN_FUTURE_WEEKS) {
      weeksFuture = MIN_FUTURE_WEEKS;
    }
    this._lastWeeksPast = weeksPast;
    this._lastWeeksFuture = weeksFuture;
  }

  private update(weeksPast: number, weeksFuture: number, observer: Observer<boolean>): void {
    this._updating = true;
    this.setTimes(weeksPast, weeksFuture);
    this.slots.updateSlots(this._startTime, this._endTime).subscribe(
      () => this.receiveUpdate(observer));
  }

  private receiveUpdate(observer: Observer<boolean>): void {
    this.initCalendar();
    this.fillSlots();
    this.updateAgenda();
    this._updating = false;
    observerNextAndComplete(observer, true);
  }

  private setTimes(weeksPast: number, weeksFuture: number): void {
    this._startTimeView = TimeTools.getLastMonday(new Date(Date.now() - weeksPast * t.MS_PER_WEEK));
    this._endTimeView = new Date(TimeTools.getLastMonday(new Date(Date.now() + (weeksFuture + 1) * t.MS_PER_WEEK)).getTime() - 1);
    this._startTime = new Date(this._startTimeView.getTime() - t.MS_PER_WEEK);
    this._endTime = new Date(this._endTimeView.getTime() + t.MS_PER_WEEK);
  }

  initCalendar(): void {
    this.calendar = [];
    for (let i = this._startTime.getTime(); i < this._endTime.getTime(); i += this._interval) {
      this.calendar.push(new CalendarItem(new Date(i), null, true));
    }
  }

  fillSlots(): void {
    for (const s of this.slots.slots) {
      if (s.start >= this._startTime && s.start <= this._endTime && !(s.free && (s.start.getTime() < (new Date()).getTime()))) {
        this.addSlotToCalendar(s, true);
      }
    }
  }

  private updateAgenda(): void {
    const agendaStart = TimeTools.getNextQuarter(new Date());
    const data = {lastDay: new Date(0), lastM: -1};
    this.agenda = [];
    for (let i = this.timeToIndex(agendaStart); i < this.calendar.length; i++) {
      if (this.calendar[i].slotStart && this.calendar[i].isSlot() && this.isSlotRelevantForAgenda(this.calendar[i].slot)) {
        const slot = this.calendar[i].slot;
        this.addSlotToAgenda(slot, data);
      }
    }
  }

  protected addSlotToAgenda(slot: Slot, data: { lastDay: Date, lastM: number }): void {
    super.addSlotToAgenda(slot, data);
    this.agenda.push(new AgendaItemSlot(slot, null, false));
  }

  private isSlotRelevantForAgenda(slot: Slot): boolean {
    if ((this._agendaMode === AgendaMode.All) ||
      (this._agendaMode === AgendaMode.Free && slot.free) ||
      (this._agendaMode === AgendaMode.Booked && !slot.free)) {
      return true;
    }
    return false;
  }

  timeToIndex(time: Date): number {
    return (time.getTime() - this._startTime.getTime()) / this._interval;
  }

  calcCalendarCountForSlot(s: Slot): number {
    return s.duration * t.MS_PER_MIN / this._interval;
  }

  private addSlotToCalendar(s: Slot, all: boolean): void {
    for (let i = 0; i < this.calcCalendarCountForSlot(s); i++) {
      this.setCalendarItemsForSlot(s, i);
    }
    if (!all) {
      this.updateAgenda();
    }
  }

  private setCalendarItemsForSlot(s: Slot, i: number): void {
    const slotIndex = this.timeToIndex(s.start);
    if (slotIndex < this.calendar.length) {
      this.calendar[slotIndex + i].slot = s;
      if (i === 0) {
        this.calendar[slotIndex].slotStart = true;
      } else {
        this.calendar[slotIndex + i].slotStart = false;
      }
    }
  }

  private errorRefresh(): void {
    this.updateSlotsAndCalendar(this._lastWeeksPast, this._lastWeeksFuture);
    this.app.dialog.defaultErrorDialog('', '');
  }

  get startTime(): Date {
    return this._startTime;
  }

  get endTime(): Date {
    return this._endTime;
  }

  get startTimeView(): Date {
    return this._startTimeView;
  }

  get endTimeView(): Date {
    return this._endTimeView;
  }

  get interval(): number {
    return this._interval;
  }

  get agendaMode(): AgendaMode {
    return this._agendaMode;
  }

  changeAgendaMode(value: AgendaMode, weeksPast: number, weeksFuture: number): void {
    this._agendaMode = value;
    this.updateSlotsAndCalendar(weeksPast, weeksFuture);
  }

}
