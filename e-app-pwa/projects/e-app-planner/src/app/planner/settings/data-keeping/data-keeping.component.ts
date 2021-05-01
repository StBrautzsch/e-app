import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../../../../libs/src/lib/account/account-service/account-service';

@Component({
  selector: 'app-data-keeping',
  templateUrl: './data-keeping.component.html',
  styleUrls: ['./data-keeping.component.scss']
})
export class DataKeepingComponent implements OnInit {

  storageDays: number;

  constructor(private account: AccountService) {
  }

  ngOnInit(): void {
    this.reset();
  }

  reset(): void {
    this.storageDays = this.account.castPlanner().user.settings.storageDays;
  }

  save(): void {
    this.account.castPlanner().user.settings.storageDays = this.storageDays;
    this.account.castPlanner().saveSettings();
  }

  isChange(): boolean {
    if (this.account.castPlanner().user.settings.storageDays === this.storageDays) {
      return false;
    }
    return true;
  }

}
