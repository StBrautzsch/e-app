import {SlotFilter} from './slot-filter';
import {BookingSlot} from '../../../../../libs/src/lib/data/booking-slot';
import {t, TimeTools} from '../../../../../libs/src/lib/time-tools';

export abstract class AbstractBookingSlotFilter {

  slots: BookingSlot[] = [];
  filteredSlots: BookingSlot[] = [];
  slotFilter: SlotFilter;

  protected constructor() {
    this.resetSlotFilter();
  }

  resetSlotFilter(): void {
    this.slotFilter = new SlotFilter();
  }

  filterSlots(): void {
    const slots: BookingSlot[] = [];
    const now = new Date();
    for (const s of this.slots) {
      if (s.start > now && this.filterSlot(s)) {
        slots.push(s);
      }
    }
    console.log('filterSlots', slots.length);
    this.filteredSlots = slots;
  }

  private filterSlot(slot: BookingSlot): boolean {
    const durationMin = SlotFilter.calcDuration(this.slotFilter.durationMin);
    const durationMax = SlotFilter.calcDuration(this.slotFilter.durationMax);
    let start = TimeTools.getDateWithZeroTime(new Date());
    if (this.slotFilter.pickDateStart !== null) {
      start = TimeTools.getDateWithZeroTime(this.slotFilter.pickDateStart.toDate());
    }
    let end = TimeTools.getDateWithZeroTime(new Date(this.slotFilter.pickDateStart.toDate().getTime() + t.MS_PER_DAY - 1));
    if (this.slotFilter.pickDateEnd !== null) {
      end = new Date(TimeTools.getDateWithZeroTime(this.slotFilter.pickDateEnd.toDate()).getTime() + t.MS_PER_DAY - 1);
    }
    if (
      this.filterSlotHour(slot, this.slotFilter.hourMin, this.slotFilter.hourMax) &&
      this.filterSlotDuration(slot, durationMin, durationMax) &&
      this.filterSlotWeekday(slot, this.slotFilter.weekdays) &&
      this.filterSlotDate(slot, start, end)) {
      return true;
    }
    return false;
  }

  private filterSlotHour(slot: BookingSlot, hourMin: number, hourMax: number): boolean {
    if ((hourMin === hourMax) && (slot.start.getHours() === hourMin)) {
      return true;
    }
    if ((slot.start.getHours() >= hourMin) && (slot.start.getHours() <= hourMax)) {
      return true;
    }
    return false;
  }

  private filterSlotDuration(slot: BookingSlot, durationMin: number, durationMax: number): boolean {
    if ((durationMin === durationMax) && (slot.duration === durationMin)) {
      return true;
    }
    if ((slot.duration >= durationMin) && (slot.duration <= durationMax)) {
      return true;
    }
    return false;
  }

  private filterSlotWeekday(slot: BookingSlot, weekdays: boolean[]): boolean {
    const day = slot.start.getDay();
    if (weekdays[0] && day === 0) {
      return true;
    }
    if (weekdays[1] && day === 1) {
      return true;
    }
    if (weekdays[2] && day === 2) {
      return true;
    }
    if (weekdays[3] && day === 3) {
      return true;
    }
    if (weekdays[4] && day === 4) {
      return true;
    }
    if (weekdays[5] && day === 5) {
      return true;
    }
    if (weekdays[6] && day === 6) {
      return true;
    }
    return false;
  }

  private filterSlotDate(slot: BookingSlot, start: Date, end: Date): boolean {
    if ((slot.start >= start) && (slot.start <= end)) {
      return true;
    }
    return false;
  }

}
