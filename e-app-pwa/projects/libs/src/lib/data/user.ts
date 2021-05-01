import {ClientSettings, ClientSettingsRaw, PlannerSettings, PlannerSettingsRaw} from './user-settings';

export abstract class User {
  readonly id: number;
  preName: string;
  name: string;
  tel: string;
  mail: string;
  mailChange: string;
  bookingActive: boolean;
  systemUser: boolean;
  feedsRef: string;
  feedsActive: boolean;

  protected constructor(raw: UserRaw) {
    this.id = raw.id;
    this.preName = raw.preName;
    this.name = raw.name;
    this.tel = raw.tel;
    this.mail = raw.mail;
    this.mailChange = raw.mailChange;
    this.bookingActive = raw.bookingActive;
    this.systemUser = raw.systemUser;
    this.feedsRef = raw.feedsRef;
    this.feedsActive = raw.feedsActive;
  }

  public mergeName(): string {
    if (this.preName !== '') {
      return this.preName + ' ' + this.name;
    }
    return this.name;
  }

  public isMailChanging(): boolean {
    if (this.mailChange.length === 0) {
      return false;
    }
    return true;
  }

}

export class UserPlanner extends User {
  readonly plannerId: number;
  admin: boolean;
  settings: PlannerSettings;

  constructor(raw: UserPlannerRaw) {
    super(raw);
    this.plannerId = raw.plannerId;
    this.admin = raw.admin;
    this.settings = new PlannerSettings(raw.settings);
  }

}

export class UserClient extends User {
  readonly clientId: number;
  settings: ClientSettings;

  constructor(raw: UserClientRaw) {
    super(raw);
    this.clientId = raw.clientId;
    this.settings = new ClientSettings(raw.settings);
  }

}

export interface UserRaw {
  readonly id: number;
  preName: string;
  name: string;
  tel: string;
  mail: string;
  mailChange: string;
  bookingActive: boolean;
  systemUser: boolean;
  feedsRef: string;
  feedsActive: boolean;
}

export interface UserPlannerRaw extends UserRaw {
  readonly plannerId: number;
  admin: boolean;
  settings: PlannerSettingsRaw;
}

export interface UserClientRaw extends UserRaw {
  readonly clientId: number;
  settings: ClientSettingsRaw;
}

export interface UserDataRaw {
  preName: string;
  name: string;
  tel: string;
  bookingActive: boolean;
  feedsActive: boolean;
}

export interface UserPwRaw {
  pw: string;
  newPw: string;
}
