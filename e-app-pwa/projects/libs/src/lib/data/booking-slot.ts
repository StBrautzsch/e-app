import {t} from '../time-tools';

export class BookingSlot {
  readonly id: number;
  readonly start: Date;
  readonly duration: number;

  constructor(raw: BookingSlotRaw) {
    this.id = raw.id;
    this.start = new Date(raw.start);
    this.duration = raw.duration;
  }

  calcEndTime(): Date {
    return new Date(this.start.getTime() + this.duration * t.MS_PER_MIN);
  }

}

export interface BookingSlotRaw {
  readonly id: number;
  readonly start: string;
  readonly duration: number;
}

export interface BookingRaw {
  readonly userId: number;
  readonly slotId: number;
  readonly start: Date;
  readonly duration: number;
  readonly remark: string;
}

export interface BookingAnonymRaw extends BookingRaw {
  readonly name: string;
  readonly mail: string;
  readonly tel: string;
}
