import {Component, Input, OnInit} from '@angular/core';
import {BaseAppService} from '../../../../../../libs/src/lib/base-app/base-app.service';
import {CalendarService} from '../../calendar-service/calendar.service';
import {CalendarViewService} from '../../calendar-service/calendar-view.service';
import {CalendarItem} from '../../calendar-service/calendar-item';
import {AbstractCalendarComponent} from '../abstract-calendar.component';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent extends AbstractCalendarComponent implements OnInit {

  @Input() calendarHeight = 100;
  @Input() days: CalendarItem[];

  constructor(public app: BaseAppService, public calendar: CalendarService, public view: CalendarViewService) {
    super(app, calendar, view);
  }

  ngOnInit(): void {
  }

}
