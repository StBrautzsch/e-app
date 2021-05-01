import {Component, OnInit} from '@angular/core';
import {CalendarViewService} from '../../../../../../e-app-planner/src/app/calendar/calendar-service/calendar-view.service';
import {AccountService} from '../../../../../../libs/src/lib/account/account-service/account-service';
import {AccountClientService} from '../../../../../../libs/src/lib/account/account-service/account-client.service';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.scss']
})
export class NotificationSettingsComponent implements OnInit {

  clientAccount: AccountClientService;

  constructor(public view: CalendarViewService, public account: AccountService) {
    this.clientAccount = account.castClient();
  }

  ngOnInit(): void {
  }

}
