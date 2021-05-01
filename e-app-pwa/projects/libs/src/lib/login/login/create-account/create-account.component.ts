import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../base-app/base-app.service';
import {createNewAccount} from '../../../data/account';
import {LoginService} from '../login.service';

@Component({
  selector: 'lib-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  preName: string;
  name: string;
  mail: string;
  tel: string;

  constructor(public app: BaseAppService, public login: LoginService) {
  }

  ngOnInit(): void {
  }

  createAccount(): void {
    const account = createNewAccount();
    account.preName = this.preName;
    account.name = this.name;
    account.mail = this.mail;
    account.tel = this.tel;
    this.login.createAccount(account.getRaw());
  }

}
