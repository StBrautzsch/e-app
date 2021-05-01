import {Component, Inject, OnInit} from '@angular/core';
import {Account, AccountRaw, AccountRole} from '../../../../../../libs/src/lib/data/account';
import {BaseAppService} from '../../../../../../libs/src/lib/base-app/base-app.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface AccountDialogData {
  account: Account;
  new: boolean;
}

export enum AccountDialogResult {SAVE, CANCEL_MAIL_CHANGE, MANUAL_VERIFICATION, DELETE}

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.scss']
})
export class AccountDialogComponent implements OnInit {

  tAccountDialogResult = AccountDialogResult;
  tAccountRole = AccountRole;

  preName: string;
  name: string;
  mail: string;
  tel: string;
  active: boolean;
  bookingActive: boolean;
  role: AccountRole;
  ret: AccountRaw;
  del = false;

  constructor(public app: BaseAppService, protected dialogRef: MatDialogRef<AccountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AccountDialogData) {
  }

  ngOnInit(): void {
    this.reset();
    this.checkDel();
  }

  private checkDel(): void {
    if ((this.data.account.bookedSlots + this.data.account.freeSlots + this.data.account.bookedAppointments) === 0) {
      this.del = true;
    }
  }

  reset(): void {
    this.preName = this.data.account.preName;
    this.name = this.data.account.name;
    this.mail = this.data.account.mail;
    this.tel = this.data.account.tel;
    this.active = this.data.account.active;
    this.bookingActive = this.data.account.bookingActive;
    this.role = this.data.account.getRole();
  }

  isChange(): boolean {
    if ((this.preName === this.data.account.preName) && (this.name === this.data.account.name) &&
      (this.mail === this.data.account.mail) && (this.tel === this.data.account.tel) && (this.active === this.data.account.active) &&
      (this.bookingActive === this.data.account.bookingActive) && (this.role === this.data.account.getRole())) {
      return false;
    }
    return true;
  }

  save(): void {
    this.data.account.preName = this.preName;
    this.data.account.name = this.name;
    this.data.account.mail = this.mail;
    this.data.account.tel = this.tel;
    this.data.account.active = this.active;
    this.data.account.bookingActive = this.bookingActive;
    this.data.account.setRole(this.role);
  }

}
