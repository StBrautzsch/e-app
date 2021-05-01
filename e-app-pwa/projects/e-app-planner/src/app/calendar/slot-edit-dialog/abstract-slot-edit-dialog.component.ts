import {Component, Inject, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {CalendarService} from '../calendar-service/calendar.service';
import {Slot} from '../../../../../libs/src/lib/data/slot';
import {BaseAppService} from '../../../../../libs/src/lib/base-app/base-app.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DurationHourMin, TimeTools} from '../../../../../libs/src/lib/time-tools';

export interface SlotEditDialogData {
  calendar: CalendarService;
  slot: Slot;
  newStart: Date;
  newDuration: number;
  newDurationSlot: number;
  newBreak: number;
  notify: boolean;
}

@Component({
  template: ''
})
export abstract class AbstractSlotEditDialogComponent implements OnInit {

  startDate: Moment;
  hour: number;
  min: number;
  minDate: Date;
  duration: DurationHourMin;

  protected constructor(public app: BaseAppService, protected dialogRef: MatDialogRef<AbstractSlotEditDialogComponent>,
                        @Inject(MAT_DIALOG_DATA) public data: SlotEditDialogData) {
    this.startDate = moment(TimeTools.getDateWithZeroTime(this.data.slot.start));
    this.hour = this.data.slot.start.getHours();
    this.min = this.data.slot.start.getMinutes();
    this.duration = TimeTools.minToHourMin(this.data.slot.duration);
    this.minDate = new Date();
  }

  ngOnInit(): void {
  }

  calcStartTime(): Date {
    return TimeTools.addTimeToDay(this.startDate.toDate(), this.hour, this.min);
  }

  hourMinToMin(): number {
    return TimeTools.hourMinToMin(this.duration);
  }

  check(): boolean {
    if (this.data.slot.free && this.isPastNew()) {
      return false;
    }
    if (this.data.calendar.isRangeFree(this.data.slot, this.calcStartTime(), this.hourMinToMin())) {
      return true;
    }
    return false;
  }

  isPastOld(): boolean {
    if (this.data.slot.start.getTime() < (new Date()).getTime()) {
      return true;
    }
    return false;
  }

  isPastNew(): boolean {
    if (this.calcStartTime().getTime() < (new Date()).getTime()) {
      return true;
    }
    return false;
  }

}
