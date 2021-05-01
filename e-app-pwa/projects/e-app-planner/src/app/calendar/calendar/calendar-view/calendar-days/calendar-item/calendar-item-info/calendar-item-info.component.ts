import {Component, Input, OnInit} from '@angular/core';
import {CalendarItem} from '../../../../../calendar-service/calendar-item';

@Component({
  selector: 'app-calendar-item-info',
  templateUrl: './calendar-item-info.component.html',
  styleUrls: ['./calendar-item-info.component.scss']
})
export class CalendarItemInfoComponent implements OnInit {

  @Input() calendarItem: CalendarItem;

  constructor() {
  }

  ngOnInit(): void {
  }

}
