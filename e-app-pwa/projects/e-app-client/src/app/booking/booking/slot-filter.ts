import * as moment from 'moment';
import {Moment} from 'moment';
import {t} from '../../../../../libs/src/lib/time-tools';

export class SlotFilter {
  hourMin = 0;
  hourMax = 24;
  durationMin = 0;
  durationMax = 4;
  weekdays: boolean[] = [true, true, true, true, true, true, true];
  pickDateStart: Moment = moment();
  pickDateEnd: Moment = moment((new Date()).getTime() + t.MS_PER_DAY * 50);

  constructor() {
  }

  static calcDuration(value: number): number {
    if (value === 0) {
      return 15;
    }
    if (value === 1) {
      return 30;
    }
    if (value === 2) {
      return 60;
    }
    if (value === 3) {
      return 120;
    }
    return 9999999999;
  }

  isHourFilter(): boolean {
    if ((this.hourMin === 0) && (this.hourMax === 24)) {
      return false;
    }
    return true;
  }

  isDurationFilter(): boolean {
    if ((this.durationMin === 0) && (this.durationMax === 4)) {
      return false;
    }
    return true;
  }

  isWeekdayFilter(): boolean {
    for (const d of this.weekdays) {
      if (d === false) {
        return true;
      }
    }
    return false;
  }

}
