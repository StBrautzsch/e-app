import {Component, Input, OnInit} from '@angular/core';
import {BaseAppService} from '../../../../../../../libs/src/lib/base-app/base-app.service';
import {CalendarService} from '../../../calendar-service/calendar.service';
import {CalendarViewService} from '../../../calendar-service/calendar-view.service';
import {AbstractCalendarComponent} from '../../abstract-calendar.component';

@Component({
  selector: 'app-hour-label',
  templateUrl: './hour-label.component.html',
  styleUrls: ['./hour-label.component.scss']
})
export class HourLabelComponent extends AbstractCalendarComponent implements OnInit {

  @Input() marginLeft = this.view.margin;
  @Input() marginRight = this.view.margin;
  @Input() grid = false;

  constructor(public app: BaseAppService, public calendar: CalendarService, public view: CalendarViewService) {
    super(app, calendar, view);
  }

  ngOnInit(): void {

  }

}
