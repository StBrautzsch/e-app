import {Observable, Observer} from 'rxjs';
import {ApiService} from '../../api/api-service/api.service';
import {AccountPlannerService} from './account-planner.service';
import {AccountClientService} from './account-client.service';
import {BaseAppService} from '../../base-app/base-app.service';
import {AbstractAccountLogin, LoginState} from './abstract-account-login';
import {observerNextAndComplete} from '../../tools';

export abstract class AccountService extends AbstractAccountLogin implements AbstractAccountLogin {

  protected constructor(protected api: ApiService, protected app: BaseAppService) {
    super(api, app);
  }

  abstract castPlanner(): AccountPlannerService;

  abstract castClient(): AccountClientService;

  saveICalFeedsActive(feedsActive: boolean): void {
    this.app.spinner.show();
    this.api.userDataSave(
      {name: this.user.name, preName: this.user.preName, tel: this.user.tel, bookingActive: this.user.bookingActive, feedsActive})
      .subscribe(
        () => this.renewLoginOrLogoutWithSpinner(),
        (error: string) => this.defaultSaveError(error));
  }

  saveUserData(name: string, preName: string, tel: string): void {
    this.app.spinner.show();
    this.api.userDataSave({name, preName, tel, bookingActive: this.user.bookingActive, feedsActive: this.user.feedsActive})
      .subscribe(
        () => this.renewLoginOrLogoutWithSpinner(),
        (error: string) => this.defaultSaveError(error));
  }

  saveUserPw(pw: string, newPw: string): Observable<boolean> {
    this.app.spinner.show();
    return new Observable((observer: Observer<boolean>) => {
      this.api.userPwSave({pw, newPw}).subscribe(
        (ret) => this.saveUserPwResultWork(ret, observer),
        (error: string) => this.defaultSaveError(error));
    });
  }

  private saveUserPwResultWork(ret: boolean, observer: Observer<boolean>): void {
    this.app.spinner.hide();
    if (ret) {
      observerNextAndComplete(observer, true);
      return this.app.newLoginRequired(true, true);
    }
    observerNextAndComplete(observer, false);
  }

  saveUserMailChange(mail: string): void {
    this.app.spinner.show();
    this.api.userMailChangeSave(mail).subscribe(
      () => this.renewLoginOrLogoutWithSpinner(),
      (error: string) => this.defaultSaveError(error));
  }

  cancelUserMailChange(): void {
    this.app.spinner.show();
    this.api.userMailChangeCancel().subscribe(
      () => this.renewLoginOrLogoutWithSpinner(),
      (error: string) => this.defaultSaveError(error));
  }

  protected defaultSaveError(error: string): void {
    this.app.dialog.defaultErrorDialog(error, '');
    this.renewLoginOrLogoutWithSpinner();
  }

  renewLoginOrLogoutWithSpinner(): void {
    this.app.spinner.show();
    this.login().subscribe((ret) => {
      this.app.spinner.hide();
      if (ret !== LoginState.SUCCESSFUL) {
        this.logout();
      }
    });
  }

}
