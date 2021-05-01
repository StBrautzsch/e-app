import {User, UserRaw} from './user';

export enum AccountRole {USER, CLIENT, PLANNER, ADMIN}

export function createNewAccount(): Account {
  return new Account({
    feedsActive: false,
    feedsRef: '',
    systemUser: false,
    bookedAppointments: 0,
    bookedSlots: 0,
    freeSlots: 0,
    lastContact: '',
    accountVerificationCode: '',
    mailVerificationCode: '',
    active: true,
    admin: false,
    bookingActive: true,
    clientActive: true,
    id: -1,
    mail: '',
    mailChange: '',
    name: '',
    plannerActive: false,
    preName: '',
    tel: ''
  });
}

export class Account extends User {
  clientActive: boolean;
  plannerActive: boolean;
  admin: boolean;
  active: boolean;
  bookingActive: boolean;
  mailVerificationCode: string;
  accountVerificationCode: string;
  lastContact: Date;
  bookedAppointments: number;
  freeSlots: number;
  bookedSlots: number;

  constructor(raw: AccountRaw) {
    super(raw);
    this.clientActive = raw.clientActive;
    this.plannerActive = raw.plannerActive;
    this.admin = raw.admin;
    this.active = raw.active;
    this.bookingActive = raw.bookingActive;
    this.mailVerificationCode = raw.mailVerificationCode;
    this.accountVerificationCode = raw.accountVerificationCode;
    this.bookedAppointments = raw.bookedAppointments;
    this.lastContact = new Date(raw.lastContact);
    this.freeSlots = raw.freeSlots;
    this.bookedSlots = raw.bookedSlots;
  }

  getRole(): AccountRole {
    if (this.admin) {
      return AccountRole.ADMIN;
    }
    if (this.plannerActive) {
      return AccountRole.PLANNER;
    }
    if (this.clientActive) {
      return AccountRole.CLIENT;
    }
    return AccountRole.USER;
  }

  setRole(role: AccountRole): void {
    if (role === AccountRole.CLIENT) {
      this.setClientRole();
    } else if (role === AccountRole.PLANNER) {
      this.setPlannerRole();
    } else if (role === AccountRole.ADMIN) {
      this.setAdminRole();
    } else {
      this.setUserRole();
    }
  }

  private setClientRole(): void {
    this.clientActive = true;
    this.plannerActive = false;
    this.admin = false;
  }

  private setPlannerRole(): void {
    this.clientActive = true;
    this.plannerActive = true;
    this.admin = false;
  }

  private setAdminRole(): void {
    this.clientActive = true;
    this.plannerActive = true;
    this.admin = true;
  }

  private setUserRole(): void {
    this.clientActive = false;
    this.plannerActive = false;
    this.admin = false;
  }

  isActive(): boolean {
    return (this.accountVerificationCode === null) && this.active;
  }

  getRaw(): AccountRaw {
    return {
      feedsActive: false,
      feedsRef: '',
      systemUser: false,
      accountVerificationCode: this.accountVerificationCode,
      active: this.active,
      admin: this.admin,
      bookedAppointments: 0,
      bookedSlots: 0,
      bookingActive: this.bookingActive,
      clientActive: this.clientActive,
      freeSlots: 0,
      id: this.id,
      lastContact: '',
      mail: this.mail,
      mailChange: this.mailChange,
      mailVerificationCode: this.mailVerificationCode,
      name: this.name,
      plannerActive: this.plannerActive,
      preName: this.preName,
      tel: this.tel
    };
  }

}

export interface AccountRaw extends UserRaw {
  clientActive: boolean;
  plannerActive: boolean;
  admin: boolean;
  active: boolean;
  bookingActive: boolean;
  mailVerificationCode: string;
  accountVerificationCode: string;
  lastContact: string;
  bookedAppointments: number;
  freeSlots: number;
  bookedSlots: number;
}

export interface AccountTransactionRaw {
  id: number;
  cancelMailChange: boolean;
  manualVerification: boolean;
}
