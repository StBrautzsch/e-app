import {Component, Inject, OnInit} from '@angular/core';
import {AbstractSlotEditDialogComponent, SlotEditDialogData} from '../abstract-slot-edit-dialog.component';
import {BaseAppService} from '../../../../../../libs/src/lib/base-app/base-app.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as moment from 'moment';
import {Moment} from 'moment';
import {DurationHourMin, t, TimeTools} from '../../../../../../libs/src/lib/time-tools';

export enum SlotMode {ONE, MULTIPLE, SERIES}

@Component({
  selector: 'app-slot-create-dialog',
  templateUrl: './slot-create-dialog.component.html',
  styleUrls: ['./slot-create-dialog.component.scss']
})
export class SlotCreateDialogComponent extends AbstractSlotEditDialogComponent implements OnInit {

  tSlotMode = SlotMode;

  endDate: Moment;
  hourEnd: number;
  minEnd: number;
  slotMode = SlotMode.ONE;

  durationSlot: DurationHourMin = {h: 0, m: 15};
  slotBreak = 0;

  constructor(public app: BaseAppService, protected dialogRef: MatDialogRef<AbstractSlotEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SlotEditDialogData) {
    super(app, dialogRef, data);
    const endDateTime = new Date(this.data.slot.start.getTime() + this.data.slot.duration * t.MS_PER_MIN);
    this.endDate = moment(TimeTools.getDateWithZeroTime(endDateTime));
    this.hourEnd = endDateTime.getHours();
    this.minEnd = endDateTime.getMinutes();
  }

  ngOnInit(): void {
  }

  save(): void {
    if (this.check()) {
      this.data.newStart = this.calcStartTime();
      this.data.newDuration = this.hourMinToMin();
      if (this.slotMode === SlotMode.ONE) {
      } else {
        this.data.newBreak = this.slotBreak;
        this.data.newDurationSlot = TimeTools.hourMinToMin(this.durationSlot);
      }
    }
  }

  calcEndTime(): Date {
    return TimeTools.addTimeToDay(this.endDate.toDate(), this.hourEnd, this.minEnd);
  }

  calcDuration(): number {
    return (this.calcEndTime().getTime() - this.calcStartTime().getTime()) / t.MS_PER_MIN;
  }

  refreshDuration(): void {
    if (this.slotMode !== SlotMode.ONE) {
      this.duration = TimeTools.minToHourMin(this.calcDuration());
    }
  }

}
