import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../base-app/base-app.service';
import {AccountService} from '../../account-service/account-service';

@Component({
  selector: 'lib-account-mail',
  templateUrl: './account-mail.component.html',
  styleUrls: ['./account-mail.component.scss']
})
export class AccountMailComponent implements OnInit {

  mail: string;

  constructor(public app: BaseAppService, public account: AccountService) {
  }

  ngOnInit(): void {
    this.reset();
  }

  reset(): void {
    this.mail = this.account.user.mail;
  }

  isChange(): boolean {
    if (this.mail === this.account.user.mail) {
      return false;
    }
    return true;
  }

}
