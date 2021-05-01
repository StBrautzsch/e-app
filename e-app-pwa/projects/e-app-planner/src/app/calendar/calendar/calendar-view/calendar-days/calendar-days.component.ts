import {Component, Input, OnInit} from '@angular/core';
import {BaseAppService} from '../../../../../../../libs/src/lib/base-app/base-app.service';
import {CalendarService} from '../../../calendar-service/calendar.service';
import {CalendarViewService} from '../../../calendar-service/calendar-view.service';
import {CalendarItem} from '../../../calendar-service/calendar-item';
import {AbstractCalendarComponent} from '../../abstract-calendar.component';

@Component({
  selector: 'app-calendar-days',
  templateUrl: './calendar-days.component.html',
  styleUrls: ['./calendar-days.component.scss']
})
export class CalendarDaysComponent extends AbstractCalendarComponent implements OnInit {

  @Input() days: CalendarItem[];

  constructor(public app: BaseAppService, public calendar: CalendarService, public view: CalendarViewService) {
    super(app, calendar, view);
  }

  ngOnInit(): void {
  }

  getCalendarSlot(dayTime: Date, slotIndex: number): CalendarItem {
    return this.calendar.calendar[this.calendar.timeToIndex(this.calcDate(slotIndex, dayTime))];
  }

}
