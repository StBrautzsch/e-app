import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../base-app/base-app.service';
import {AccountService} from '../account-service/account-service';

@Component({
  selector: 'lib-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  constructor(public app: BaseAppService, public account: AccountService) {
  }

  ngOnInit(): void {
    this.app.page = this.app.titles.account;
    this.account.renewLoginOrLogoutWithSpinner();
  }

}
