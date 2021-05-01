import {t} from '../time-tools';

export abstract class CalendarObject {
  readonly id: number;
  start: Date;
  duration: number;
  bookingRemark: string;
  changing = false;

  protected constructor(raw: CalendarObjectRaw) {
    this.id = raw.id;
    this.start = new Date(raw.start);
    this.duration = raw.duration;
    this.bookingRemark = raw.bookingRemark;
  }

  calcEndTime(): Date {
    return new Date(this.start.getTime() + this.duration * t.MS_PER_MIN);
  }

}

export class Slot extends CalendarObject {
  bookingClientPreName: string;
  bookingClientName: string;
  bookingClientMail: string;
  bookingClientTel: string;
  clientAnonym: boolean;
  free: boolean;
  clientAuth: boolean;
  changing = false;

  constructor(raw: SlotRaw) {
    super(raw);
    this.bookingClientPreName = raw.bookingClientPreName;
    this.bookingClientName = raw.bookingClientName;
    this.bookingClientMail = raw.bookingClientMail;
    this.bookingClientTel = raw.bookingClientTel;
    this.clientAnonym = raw.clientAnonym;
    this.free = raw.free;
    this.clientAuth = raw.clientAuth;
  }

  mergeClientName(): string {
    if (this.bookingClientPreName !== '') {
      return this.bookingClientPreName + ' ' + this.bookingClientName;
    }
    return this.bookingClientName;
  }

  isEqual(slot: Slot): boolean {
    return (JSON.stringify(this) === JSON.stringify(slot));
  }

  updateBooking(slot: Slot): void {
    this.bookingClientPreName = slot.bookingClientPreName;
    this.bookingClientName = slot.bookingClientName;
    this.bookingClientMail = slot.bookingClientMail;
    this.bookingClientTel = slot.bookingClientTel;
    this.clientAnonym = slot.clientAnonym;
    this.free = slot.free;
    this.clientAuth = slot.clientAuth;
    this.bookingRemark = slot.bookingRemark;
  }

  updateTime(startNew: Date, durationNew: number): void {
    this.start = new Date(startNew.getTime());
    this.duration = durationNew;
  }

}

export class Appointment extends CalendarObject {
  readonly bookingPlannerPreName: string;
  readonly bookingPlannerName: string;
  readonly bookingPlannerMail: string;
  readonly bookingPlannerTel: string;

  constructor(raw: AppointmentRaw) {
    super(raw);
    this.bookingPlannerPreName = raw.bookingPlannerPreName;
    this.bookingPlannerName = raw.bookingPlannerName;
    this.bookingPlannerMail = raw.bookingPlannerMail;
    this.bookingPlannerTel = raw.bookingPlannerTel;
  }

  mergePlannerName(): string {
    if (this.bookingPlannerPreName !== '') {
      return this.bookingPlannerPreName + ' ' + this.bookingPlannerName;
    }
    return this.bookingPlannerName;
  }

}

export interface CalendarObjectRaw {
  id: number;
  start: string;
  duration: number;
  bookingRemark: string;
}

export interface SlotRaw extends CalendarObjectRaw {
  bookingClientPreName: string;
  bookingClientName: string;
  bookingClientMail: string;
  bookingClientTel: string;
  clientAnonym: boolean;
  free: boolean;
  clientAuth: boolean;
}

export interface AppointmentRaw extends CalendarObjectRaw {
  bookingPlannerPreName: string;
  bookingPlannerName: string;
  bookingPlannerMail: string;
  bookingPlannerTel: string;
}

export interface SlotMoveRaw {
  id: number;
  start: Date;
  duration: number;
  notify: boolean;
}

export interface SlotCreateRaw {
  start: Date;
  duration: number;
}
