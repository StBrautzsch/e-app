import {Component, OnInit} from '@angular/core';
import {CalendarViewService} from '../../../calendar/calendar-service/calendar-view.service';
import {LabelType, Options} from '@angular-slider/ngx-slider';
import {AccountService} from '../../../../../../libs/src/lib/account/account-service/account-service';
import {AccountPlannerService} from '../../../../../../libs/src/lib/account/account-service/account-planner.service';
import {WeekdayMode} from '../../../../../../libs/src/lib/data/user-settings';

@Component({
  selector: 'app-calendar-settings',
  templateUrl: './calendar-settings.component.html',
  styleUrls: ['./calendar-settings.component.scss']
})
export class CalendarSettingsComponent implements OnInit {

  tWeekdayMode = WeekdayMode;

  plannerAccount: AccountPlannerService;

  options: Options = {
    floor: 0,
    ceil: 24,
    translate: (value: number, label: LabelType): string => {
      return value + ' Uhr';
    }
  };

  constructor(public view: CalendarViewService, public account: AccountService) {
    this.plannerAccount = account.castPlanner();
  }

  ngOnInit(): void {
  }

}
