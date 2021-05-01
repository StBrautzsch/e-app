import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../base-app/base-app.service';
import {ShareEAppComponent} from '../share-e-app.component';
import {libConst} from '../../../lib-const';
import {AccountService} from '../../../account/account-service/account-service';
import {SHARE_TEXT} from '../../../msg';

@Component({
  selector: 'lib-share-planner',
  templateUrl: './share-planner.component.html',
  styleUrls: ['./share-planner.component.scss']
})
export class SharePlannerComponent extends ShareEAppComponent implements OnInit {

  url = '';
  shareText = SHARE_TEXT.PLANNER;
  shareTitle = libConst.plannerAppNameShort;

  constructor(public app: BaseAppService, protected account: AccountService) {
    super(app, account);
    this.url = app.plannerUrl;
    this.setMsg();
  }

  private setMsg(): void {
    this.checkShare();
    if (this.account.isAuth()) {
      this.shareText += SHARE_TEXT.GREETINGS + this.account.user.mergeName();
    }
  }

  ngOnInit(): void {
  }

}
