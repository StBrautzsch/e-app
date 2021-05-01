import {Slot} from '../../../../../libs/src/lib/data/slot';
import {t} from '../../../../../libs/src/lib/time-tools';

export class CalendarItem {

  readonly time: Date;
  slot: Slot;
  slotStart: boolean;

  constructor(time: Date, slot: Slot, start: boolean) {
    this.time = time;
    this.slot = slot;
    this.slotStart = start;
  }

  isSlot(): boolean {
    if (this.slot === null) {
      return false;
    }
    return true;
  }

  isBooked(): boolean {
    if (this.isSlot()) {
      return !this.slot.free;
    }
    return false;
  }

  isSlotEnd(): boolean {
    if (this.isSlot() && this.slot.calcEndTime().getTime() > this.time.getTime() &&
      this.slot.calcEndTime().getTime() <= this.time.getTime() + 15 * t.MS_PER_MIN) {
      return true;
    }
    return false;
  }

}
