import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../base-app/base-app.service';
import {AccountService} from '../../account/account-service/account-service';

@Component({
  selector: 'lib-share-e-app',
  templateUrl: './share-e-app.component.html',
  styleUrls: ['./share-e-app.component.scss']
})
export class ShareEAppComponent implements OnInit {

  isShareSupported = false;
  url = '';
  shareText = '';
  shareTitle = '';

  constructor(public app: BaseAppService, protected account: AccountService) {
  }

  ngOnInit(): void {
    this.app.page = this.app.titles.share;
    this.checkShare();
  }

  protected checkShare(): boolean {
    if (navigator.share) {
      this.isShareSupported = true;
    } else {
      this.isShareSupported = false;
    }
    return this.isShareSupported;
  }

  share(): void {
    if (this.checkShare()) {
      navigator.share({
        title: this.shareTitle,
        text: this.shareText,
        url: this.url
      });
    }
  }

}
