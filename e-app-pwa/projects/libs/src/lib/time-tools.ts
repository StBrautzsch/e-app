export const t = {
  HOUR_PER_DAY: 24,
  SEC_PER_MIN: 60,
  MIN_PER_HOUR: 60,
  MS_PER_SEC: 1000,
  DAY_PER_WEEK: 7,
  MS_PER_MIN: 1000 * 60,
  MS_PER_HOUR: 1000 * 60 * 60,
  MS_PER_DAY: 24 * 1000 * 60 * 60,
  MS_PER_WEEK: 7 * 24 * 1000 * 60 * 60,
};

export const WEEKDAYS_GER = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

export interface DurationHourMin {
  h: number;
  m: number;
}

export const NORMAL_DAY = new Date(2020, 1, 1, 0, 0, 0, 0);

export class TimeTools {

  static getNextQuarter(date: Date): Date {
    const min = date.getMinutes();
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
    if (min > 45) {
      return new Date(date.getTime() + t.MS_PER_HOUR);
    } else if (min > 30) {
      return new Date(date.getTime() + t.MS_PER_MIN * 45);
    } else if (min > 15) {
      return new Date(date.getTime() + t.MS_PER_MIN * 30);
    }
    return new Date(date.getTime() + t.MS_PER_MIN * 15);
  }

  static isSameDay(d1: Date, d2: Date): boolean {
    if (d1.getFullYear() === d2.getFullYear()
      && d1.getMonth() === d2.getMonth()
      && d1.getDate() === d2.getDate()) {
      return true;
    }
    return false;
  }

  static getWeekDayName(date: Date): string {
    return WEEKDAYS_GER[date.getDay()];
  }

  static getLastMonday(date: Date): Date {
    while (date.getDay() !== 1) {
      date = new Date(date.getTime() - t.MS_PER_DAY);
    }
    return this.getDateWithZeroTime(date);
  }

  static getDateWithZeroTime(date: Date = NORMAL_DAY): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  }

  static minToHourMin(duration: number): DurationHourMin {
    let h = 0;
    let m = 0;
    while (h * t.MIN_PER_HOUR + m < duration) {
      m = m + 15;
      if (m === 60) {
        m = 0;
        h++;
      }
    }
    return {h, m};
  }

  static hourMinToMin(hourMin: DurationHourMin): number {
    return hourMin.h * t.MIN_PER_HOUR + hourMin.m;
  }

  static addTimeToDay(day: Date, hour: number, min: number): Date {
    const d = this.getDateWithZeroTime(day);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, min);
  }

  static isWeekday(day: Date): boolean {
    if (this.isSunday(day) || this.isSaturday(day)) {
      return false;
    }
    return true;
  }

  static isSunday(day: Date): boolean {
    if (day.getDay() === 0) {
      return true;
    }
    return false;
  }

  static isSaturday(day: Date): boolean {
    if (day.getDay() === 6) {
      return true;
    }
    return false;
  }

}

export class StartEnd {
  readonly start: Date;
  readonly end: Date;

  constructor(d1: Date, d2: Date) {
    this.start = d1;
    this.end = d2;
    if (this.start.getTime() > this.end.getTime()) {
      this.end = d1;
      this.start = d2;
    }
  }

  duration(): number {
    return this.end.getTime() - this.start.getTime();
  }

}
