import {Component, OnInit} from '@angular/core';
import {AccountPlannerService} from '../../../../../../libs/src/lib/account/account-service/account-planner.service';
import {AccountService} from '../../../../../../libs/src/lib/account/account-service/account-service';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {

  plannerAccount: AccountPlannerService;

  constructor(public account: AccountService) {
    this.plannerAccount = account.castPlanner();
  }

  ngOnInit(): void {
  }

}
