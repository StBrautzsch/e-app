import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../base-app/base-app.service';
import {AccountService} from '../../account-service/account-service';

@Component({
  selector: 'lib-account-pw',
  templateUrl: './account-pw.component.html',
  styleUrls: ['./account-pw.component.scss']
})
export class AccountPwComponent implements OnInit {

  pwOld: string;
  newPW: string;

  hideOld = true;
  hideNew = true;

  error = false;

  constructor(public app: BaseAppService, public account: AccountService) {
  }

  ngOnInit(): void {
    this.reset();
  }

  reset(): void {
    this.pwOld = '';
    this.newPW = '';
  }

  save(): void {
    this.account.saveUserPw(this.pwOld, this.newPW).subscribe(
      (ret) => {
        if (!ret) {
          this.error = true;
        } else {
          this.error = false;
        }
      });
  }

}
