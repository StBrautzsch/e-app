import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../base-app/base-app.service';
import {AccountService} from '../../account-service/account-service';
import {environment} from '../../../../../../e-app-planner/src/environments/environment';

@Component({
  selector: 'lib-i-cal-feeds',
  templateUrl: './i-cal-feeds.component.html',
  styleUrls: ['./i-cal-feeds.component.scss']
})
export class ICalFeedsComponent implements OnInit {

  url = environment.apiHost + environment.apiUrl + 'ical-feeds/';

  constructor(public app: BaseAppService, public account: AccountService) {
  }

  ngOnInit(): void {
  }

}
