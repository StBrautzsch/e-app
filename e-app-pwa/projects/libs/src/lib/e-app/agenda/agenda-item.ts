import {Appointment, CalendarObject, Slot} from '../../data/slot';

export abstract class AgendaItem {
  date: Date;
  item: CalendarObject;
  newMonth: boolean;

  protected constructor(item: CalendarObject, date: Date, newMonth: boolean) {
    this.item = item;
    this.date = date;
    this.newMonth = newMonth;
  }

  isItem(): boolean {
    if (this.item === null) {
      return false;
    }
    return true;
  }

}

export class AgendaItemAppointment extends AgendaItem{
  item: Appointment;

  constructor(appointment: Appointment, date: Date, newMonth: boolean) {
    super(appointment, date, newMonth);
  }

}

export class AgendaItemSlot extends AgendaItem{
  item: Slot;

  constructor(slot: Slot, date: Date, newMonth: boolean) {
    super(slot, date, newMonth);
  }

}
