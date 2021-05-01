import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {BaseAppService} from '../../base-app/base-app.service';
import {t, TimeTools} from '../../time-tools';

@Component({
  selector: 'lib-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {

  @Input() date: Moment;
  @Input() minDate = new Date(TimeTools.getDateWithZeroTime(new Date((new Date()).getTime() - t.MS_PER_WEEK * 53 * 10)));
  @Input() maxDate = new Date(TimeTools.getDateWithZeroTime(new Date((new Date()).getTime() + t.MS_PER_WEEK * 53 * 10)));
  @Input() hour: number;
  @Input() min: number;

  @Output() dateModelChange = new EventEmitter<Moment>();
  @Output() hourModelChange = new EventEmitter<number>();
  @Output() minModelChange = new EventEmitter<number>();

  constructor(public app: BaseAppService) {
  }

  ngOnInit(): void {
  }

  calcDateTime(): Date {
    return TimeTools.addTimeToDay(this.date.toDate(), this.hour, this.min);
  }

  addDay(): void {
    const d = new Date(this.date.toDate().getTime() + t.MS_PER_DAY);
    this.date = moment(d);
    this.dateModelChange.emit(this.date);
  }

  subDay(): void {
    const d = new Date(this.date.toDate().getTime() - t.MS_PER_DAY);
    this.date = moment(d);
    this.dateModelChange.emit(this.date);
  }

}
