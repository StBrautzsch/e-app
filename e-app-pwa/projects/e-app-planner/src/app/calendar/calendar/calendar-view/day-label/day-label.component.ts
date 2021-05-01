import {Component, Input, OnInit} from '@angular/core';
import {AbstractCalendarComponent} from '../../abstract-calendar.component';
import {BaseAppService} from '../../../../../../../libs/src/lib/base-app/base-app.service';
import {CalendarService} from '../../../calendar-service/calendar.service';
import {CalendarViewService} from '../../../calendar-service/calendar-view.service';
import {CalendarItem} from '../../../calendar-service/calendar-item';

@Component({
  selector: 'app-day-label',
  templateUrl: './day-label.component.html',
  styleUrls: ['./day-label.component.scss']
})
export class DayLabelComponent extends AbstractCalendarComponent implements OnInit {

  @Input() days: CalendarItem[];

  constructor(public app: BaseAppService, public calendar: CalendarService, public view: CalendarViewService) {
    super(app, calendar, view);
  }

  ngOnInit(): void {
  }

}
