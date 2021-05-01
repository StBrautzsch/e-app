import {Component, Input, OnInit} from '@angular/core';
import {BaseAppService} from '../../../base-app/base-app.service';
import {t, TimeTools} from '../../../time-tools';

@Component({
  selector: 'lib-agenda-header-item',
  templateUrl: './agenda-header-item.component.html',
  styleUrls: ['./agenda-header-item.component.scss']
})
export class AgendaHeaderItemComponent implements OnInit {

  @Input() date: Date;
  @Input() newMonth: boolean;

  now: Date;
  tomorrow: Date;

  constructor(public app: BaseAppService) {
    this.now = new Date();
    this.tomorrow = new Date(this.now.getTime() + t.MS_PER_DAY);
  }

  ngOnInit(): void {
  }

  isSameDay(d1: Date, d2: Date): boolean {
    return TimeTools.isSameDay(d1, d2);
  }

  isToday(d: Date): boolean {
    return this.isSameDay(d, this.now);
  }

  isTomorrow(d: Date): boolean {
    return this.isSameDay(d, this.tomorrow);
  }

}
