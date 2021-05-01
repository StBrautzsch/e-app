import {Injectable} from '@angular/core';
import {ApiService} from '../../../../libs/src/lib/api/api-service/api.service';
import {BaseAppService} from '../../../../libs/src/lib/base-app/base-app.service';
import {ApiPlannerService} from '../../../../libs/src/lib/api/api-service/api-planner.service';
import {Observable, Observer} from 'rxjs';
import {observerNextAndComplete} from '../../../../libs/src/lib/tools';
import {Account, createNewAccount} from '../../../../libs/src/lib/data/account';
import {MatDialog} from '@angular/material/dialog';
import {AccountDialogComponent, AccountDialogData, AccountDialogResult} from './admin/account-dialog/account-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  accounts: Account[] = [];
  private _lastUpdate = new Date(0);
  private _updating = false;
  plannerApi: ApiPlannerService;

  accountFilter = '';
  plannerFilter = true;
  clientFilter = true;
  adminFilter = true;
  deactivatedFilter = true;

  constructor(private api: ApiService, private app: BaseAppService, private dialog: MatDialog) {
    console.log('AdminService');
    this.plannerApi = api.castPlanner();
  }

  showAccountCreateDialog(): void {
    const account = createNewAccount();
    const data: AccountDialogData = {account, new: true};
    this.showAccountDialog(data, account);
  }

  showAccountEditDialog(account: Account): void {
    const data: AccountDialogData = {account, new: false};
    this.showAccountDialog(data, account);
  }

  private showAccountDialog(data: AccountDialogData, account: Account): void {
    this.dialog.open(AccountDialogComponent, {data}).afterClosed()
      .subscribe((ret: AccountDialogResult) => this.afterClosedAccountDialog(ret, data, account));
  }

  private afterClosedAccountDialog(ret: AccountDialogResult, data: AccountDialogData, account: Account): void {
    if ((ret === AccountDialogResult.SAVE) && data.new) {
      return this.createAccount(account);
    }
    if ((ret === AccountDialogResult.SAVE) && !data.new) {
      return this.changeAccount(account);
    }
    if (ret === AccountDialogResult.CANCEL_MAIL_CHANGE) {
      return this.cancelMailChange(account);
    }
    if (ret === AccountDialogResult.MANUAL_VERIFICATION) {
      return this.manualVerification(account);
    }
    if (ret === AccountDialogResult.DELETE) {
      return this.deleteAccount(account.id);
    }
  }

  private deleteAccount(id: number): void {
    const transaction = this.plannerApi.accountDelete(id);
    this.accountTransaction(transaction);
  }

  private changeAccount(account: Account): void {
    const transaction = this.plannerApi.accountPut(account.getRaw());
    this.accountTransaction(transaction);
  }

  private createAccount(account: Account): void {
    const transaction = this.plannerApi.accountPost(account.getRaw());
    this.accountTransaction(transaction);
  }

  private cancelMailChange(account: Account): void {
    const transaction = this.plannerApi.accountPatch({cancelMailChange: true, id: account.id, manualVerification: false});
    this.accountTransaction(transaction);
  }

  private manualVerification(account: Account): void {
    const transaction = this.plannerApi.accountPatch({cancelMailChange: false, id: account.id, manualVerification: true});
    this.accountTransaction(transaction);
  }

  private accountTransaction(transaction: Observable<boolean>): void {
    this._updating = true;
    transaction.subscribe(
      () => this.updateAccounts().subscribe(),
      (error: string) => {
        this.updateAccounts().subscribe();
        this.app.dialog.defaultErrorDialog(error, '');
      }
    );
  }

  updateAccounts(): Observable<number> {
    this._updating = true;
    return new Observable((observer: Observer<number>) => {
      this.plannerApi.accountGet().subscribe(
        (data) => this.receiveAccounts(data, observer));
    });
  }

  private receiveAccounts(data: Account[], observer: Observer<number>): void {
    this._lastUpdate = new Date();
    this.accounts = data;
    console.log('updateAccounts', data.length);
    this._updating = false;
    observerNextAndComplete(observer, this.accounts.length);
  }

  getFilteredAccounts(): Account[] {
    const filter = this.accountFilter.toLowerCase();
    const data: Account[] = [];
    for (const a of this.accounts) {
      this.filterAccounts(a, filter, data);
    }
    return data;
  }

  private filterAccounts(a: Account, filter: string, data: Account[]): void {
    const values = a.preName + a.name + a.mail + a.tel;
    if (values.toLowerCase().includes(filter) && this.filterDeactivated(a) &&
      ((this.filterClient(a) || this.filterPlanner(a) || this.filterAdmin(a)))) {
      data.push(a);
    }
  }

  private filterPlanner(a: Account): boolean {
    return this.plannerFilter && a.plannerActive && !a.admin;
  }

  private filterClient(a: Account): boolean {
    return this.clientFilter && a.clientActive && !a.plannerActive;
  }

  private filterAdmin(a: Account): boolean {
    return this.adminFilter && a.admin;
  }

  private filterDeactivated(a: Account): boolean {
    if (this.deactivatedFilter) {
      return true;
    }
    return a.isActive();
  }

  get updating(): boolean {
    return this._updating;
  }

}
