import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../base-app/base-app.service';
import {AccountService} from '../../account-service/account-service';

@Component({
  selector: 'lib-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.scss']
})
export class AccountDataComponent implements OnInit {

  name: string;
  preName: string;
  tel: string;

  constructor(public app: BaseAppService, public account: AccountService) {
  }

  ngOnInit(): void {
    this.reset();
  }

  reset(): void {
    this.name = this.account.user.name;
    this.preName = this.account.user.preName;
    this.tel = this.account.user.tel;
  }

  isChange(): boolean {
    if ((this.name === this.account.user.name) && (this.preName === this.account.user.preName) && (this.tel === this.account.user.tel)) {
      return false;
    }
    return true;
  }

  save(): void {
    this.account.saveUserData(this.name, this.preName, this.tel);
  }

}
