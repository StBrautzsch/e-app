import {Injectable} from '@angular/core';
import {ApiService} from '../../api/api-service/api.service';
import {AccountService} from './account-service';
import {UserPlanner, UserPlannerRaw} from '../../data/user';
import {BaseAppService} from '../../base-app/base-app.service';

@Injectable({
  providedIn: 'root'
})
export class AccountPlannerService extends AccountService implements AccountService {

  user: UserPlanner;

  constructor(protected api: ApiService, protected app: BaseAppService) {
    super(api, app);
    console.log('AccountPlannerService');
  }

  castPlanner(): AccountPlannerService {
    return this;
  }

  castClient(): any {
    return null;
  }

  isAdmin(): boolean {
    if (this.isAuth() && this.user !== undefined && this.user.admin) {
      return true;
    }
    return false;
  }

  protected parseSessionData(data: string): void {
    const userRaw: UserPlannerRaw = JSON.parse(data);
    this.user = new UserPlanner(userRaw);
  }

  saveSettings(): void {
    this.api.castPlanner().settingsSave(this.user.settings.exportRaw()).subscribe();
  }

  saveBookingActive(bookingActive: boolean): void {
    this.app.spinner.show();
    this.api.userDataSave(
      {name: this.user.name, preName: this.user.preName, tel: this.user.tel, bookingActive, feedsActive: this.user.feedsActive})
      .subscribe(
        () => this.renewLoginOrLogoutWithSpinner(),
        (error: string) => this.defaultSaveError(error));
  }

}
