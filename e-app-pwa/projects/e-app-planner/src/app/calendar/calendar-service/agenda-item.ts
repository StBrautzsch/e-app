import {Slot} from '../../../../../libs/src/lib/data/slot';

export class AgendaItem {
  slot: Slot;
  date: Date;
  newMonth: boolean;

  constructor(slot: Slot, date: Date, newMonth: boolean) {
    this.slot = slot;
    this.date = date;
    this.newMonth = newMonth;
  }

  isSlot(): boolean {
    if (this.slot === null) {
      return false;
    }
    return true;
  }

}
