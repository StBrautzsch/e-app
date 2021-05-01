import {AgendaItem, AgendaItemSlot} from './agenda-item';
import {CalendarObject} from '../../data/slot';
import {TimeTools} from '../../time-tools';

export abstract class AgendaService {

  abstract agenda: AgendaItem[];
  protected _lastUpdate = new Date(0);
  protected _updating = false;

  protected constructor() {
  }

  get lastUpdate(): Date {
    return this._lastUpdate;
  }

  get updating(): boolean {
    return this._updating;
  }

  protected addDateItemToAgenda(slot: CalendarObject, data: { lastDay: Date; lastM: number }): void {
    data.lastDay = TimeTools.getDateWithZeroTime(slot.start);
    if (data.lastM !== slot.start.getMonth()) {
      data.lastM = slot.start.getMonth();
      this.agenda.push(new AgendaItemSlot(null, data.lastDay, true));
    } else {
      this.agenda.push(new AgendaItemSlot(null, data.lastDay, false));
    }
  }

  protected addSlotToAgenda(slot: CalendarObject, data: { lastDay: Date, lastM: number }): void {
    if (!TimeTools.isSameDay(data.lastDay, slot.start)) {
      this.addDateItemToAgenda(slot, data);
    }
  }

}
