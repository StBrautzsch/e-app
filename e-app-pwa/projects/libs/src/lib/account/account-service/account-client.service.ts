import {Injectable} from '@angular/core';
import {AccountService} from './account-service';
import {ApiService} from '../../api/api-service/api.service';
import {UserClient, UserClientRaw} from '../../data/user';
import {BaseAppService} from '../../base-app/base-app.service';

@Injectable({
  providedIn: 'root'
})
export class AccountClientService extends AccountService implements AccountService {

  user: UserClient;

  constructor(protected api: ApiService, protected app: BaseAppService) {
    super(api, app);
    console.log('AccountClientService');
  }

  castPlanner(): any {
    return null;
  }

  castClient(): AccountClientService {
    return this;
  }

  protected parseSessionData(data: string): void {
    const userRaw: UserClientRaw = JSON.parse(data);
    this.user = new UserClient(userRaw);
  }

  saveSettings(): void {
    this.api.castClient().settingsSave(this.user.settings.exportRaw()).subscribe();
  }

}
