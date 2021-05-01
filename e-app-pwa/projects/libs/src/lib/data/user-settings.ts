export enum WeekdayMode {ALL, HIDE_WE, HIDE_SU}

export class PlannerSettings {
  weekdayMode: WeekdayMode;
  hourFrom: number;
  hourTo: number;
  weeksPast: number;
  weeksFuture: number;
  storageDays: number;
  reminderMail: boolean;
  bookingMail: boolean;
  stornoMail: boolean;

  constructor(raw: PlannerSettingsRaw) {
    this.weekdayMode = WeekdayMode.ALL;
    if (raw.weekdayMode === 1) {
      this.weekdayMode = WeekdayMode.HIDE_WE;
    }
    if (raw.weekdayMode === 2) {
      this.weekdayMode = WeekdayMode.HIDE_SU;
    }
    this.hourFrom = raw.hourFrom;
    this.hourTo = raw.hourTo;
    this.weeksPast = raw.weeksPast;
    this.weeksFuture = raw.weeksFuture;
    this.storageDays = raw.storageDays;
    this.reminderMail = raw.reminderMail;
    this.bookingMail = raw.bookingMail;
    this.stornoMail = raw.stornoMail;
  }

  exportRaw(): PlannerSettingsRaw {
    return {
      hourFrom: this.hourFrom,
      hourTo: this.hourTo,
      storageDays: this.storageDays,
      weekdayMode: this.weekdayMode.valueOf(),
      weeksFuture: this.weeksFuture,
      weeksPast: this.weeksPast,
      bookingMail: this.bookingMail,
      reminderMail: this.reminderMail,
      stornoMail: this.stornoMail
    };
  }

}

export class ClientSettings {
  reminderMail: boolean;
  bookingMail: boolean;

  constructor(raw: ClientSettingsRaw) {
    this.reminderMail = raw.reminderMail;
    this.bookingMail = raw.bookingMail;
  }

  exportRaw(): ClientSettingsRaw {
    return {
      bookingMail: this.bookingMail,
      reminderMail: this.reminderMail
    };
  }

}

export interface PlannerSettingsRaw {
  weekdayMode: number;
  hourFrom: number;
  hourTo: number;
  weeksPast: number;
  weeksFuture: number;
  storageDays: number;
  reminderMail: boolean;
  bookingMail: boolean;
  stornoMail: boolean;
}

export interface ClientSettingsRaw {
  reminderMail: boolean;
  bookingMail: boolean;
}
