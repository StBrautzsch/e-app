import {Component, OnInit} from '@angular/core';
import {AccountPlannerService} from '../../../../../../libs/src/lib/account/account-service/account-planner.service';
import {CalendarViewService} from '../../../calendar/calendar-service/calendar-view.service';
import {AccountService} from '../../../../../../libs/src/lib/account/account-service/account-service';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.scss']
})
export class NotificationSettingsComponent implements OnInit {

  plannerAccount: AccountPlannerService;

  constructor(public view: CalendarViewService, public account: AccountService) {
    this.plannerAccount = account.castPlanner();
  }

  ngOnInit(): void {
  }

}
