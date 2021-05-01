import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../base-app/base-app.service';
import {ShareEAppComponent} from '../share-e-app.component';
import {libConst} from '../../../lib-const';
import {AccountService} from '../../../account/account-service/account-service';
import {SHARE_TEXT} from '../../../msg';

@Component({
  selector: 'lib-share-client',
  templateUrl: './share-client.component.html',
  styleUrls: ['./share-client.component.scss']
})
export class ShareClientComponent extends ShareEAppComponent implements OnInit {

  url = '';
  shareText = '';
  shareTitle = libConst.clientAppNameShort;
  personalLink = false;

  constructor(public app: BaseAppService, public account: AccountService) {
    super(app, account);
    this.setMsg();
  }

  private setMsg(): void {
    if (this.app.isPlanner) {
      this.shareText = SHARE_TEXT.CLIENT_FROM_PLANNER;
    } else {
      this.shareText = SHARE_TEXT.CLIENT_FROM_CLIENT;
    }
    if (this.account.isAuth()) {
      this.shareText += SHARE_TEXT.GREETINGS + this.account.user.mergeName();
    }
  }

  ngOnInit(): void {
    this.checkShare();
    if (this.app.isPlanner && this.account.isAuth()) {
      this.personalLink = true;
    }
    this.setUrl();
  }

  setUrl(): void {
    if (this.personalLink) {
      this.url = this.app.clientUrl + '?planner=' + this.account.user.mail.replace('@', '%40');
    } else {
      this.url = this.app.clientUrl;
    }
  }

}
