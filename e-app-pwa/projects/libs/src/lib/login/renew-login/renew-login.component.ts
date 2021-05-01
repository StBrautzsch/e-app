import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../base-app/base-app.service';
import {AccountService} from '../../account/account-service/account-service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginState} from '../../account/account-service/abstract-account-login';

@Component({
  selector: 'lib-renew-login',
  templateUrl: './renew-login.component.html',
  styleUrls: ['./renew-login.component.scss']
})
export class RenewLoginComponent implements OnInit {

  constructor(public app: BaseAppService, public account: AccountService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.app.spinner.show();
    if (this.account.isValidTokenExisting()) {
      console.log('Renew Login...');
      this.account.login().subscribe((ret) => {
        if (ret === LoginState.SUCCESSFUL) {
          this.app.spinner.hide();
          this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || '/');
        } else {
          this.app.spinner.hide();
          this.account.logout();
        }
      });
    } else {
      this.account.logout();
    }
  }

}
