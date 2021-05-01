import {Component, OnInit} from '@angular/core';
import {CalendarViewMode, CalendarViewService} from '../../calendar-service/calendar-view.service';
import {BaseAppService} from '../../../../../../libs/src/lib/base-app/base-app.service';
import {CalendarService} from '../../calendar-service/calendar.service';

@Component({
  selector: 'app-calendar-toolbar-menu',
  templateUrl: './calendar-toolbar-menu.component.html',
  styleUrls: ['./calendar-toolbar-menu.component.scss']
})
export class CalendarToolbarMenuComponent implements OnInit {

  tMode = CalendarViewMode;

  constructor(public app: BaseAppService, public view: CalendarViewService, public calendar: CalendarService) {
  }

  ngOnInit(): void {
  }

}
