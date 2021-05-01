import {Component, Input, OnInit} from '@angular/core';
import {BaseAppService} from '../../../../../../../../libs/src/lib/base-app/base-app.service';
import {CalendarService} from '../../../../calendar-service/calendar.service';
import {CalendarViewService} from '../../../../calendar-service/calendar-view.service';
import {CalendarItem} from '../../../../calendar-service/calendar-item';
import {CdkDragDrop, CdkDragEnter} from '@angular/cdk/drag-drop';
import {Slot} from '../../../../../../../../libs/src/lib/data/slot';
import {CalendarDialogService} from '../../../../calendar-service/calendar-dialog.service';
import {REPLACE_STRING, SB_MSG} from '../../../../../../../../libs/src/lib/msg';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss']
})
export class CalendarItemComponent implements OnInit {

  @Input() calendarItem: CalendarItem;

  drag = false;
  showTimeEnter = false;
  showTimeClick = false;

  constructor(public app: BaseAppService, public calendar: CalendarService, public view: CalendarViewService,
              public dialog: CalendarDialogService) {
  }

  ngOnInit(): void {
  }

  isCreating(): boolean {
    if (this.calendar.create !== null && this.calendar.create === this.calendarItem) {
      return true;
    }
    return false;
  }

  private calendarItemInPast(): boolean {
    if (this.calendarItem.time.getTime() < (new Date()).getTime()) {
      return true;
    }
    return false;
  }

  click(): void {
    if (this.calendarItem.isSlot()) {
      this.calendar.create = null;
      this.dialog.showSlotDetailsDialogWithUpdateIfRequired(this.calendarItem.slot.id);
    } else if (this.calendarItemInPast()) {
      this.app.dialog.showSnackBar(SB_MSG.ERROR_CREATE_SLOT_PAST);
      this.calendar.create = null;
    } else if (this.calendar.isSpeedSlotMode()) {
      this.speedSlotCreate();
      this.calendar.create = null;
    } else if (this.calendar.create === null) {
      this.calendar.create = this.calendarItem;
    } else if (this.calendar.create !== null) {
      this.dialog.showSlotCreateDialogStartEndWithUpdateIfRequired(this.calendar.create.time, this.calendarItem.time);
      this.calendar.create = null;
    } else {
      this.calendar.create = null;
    }
  }

  speedSlotCreate(): void {
    const duration = this.calendar.getSpeedCreateSlotDuration();
    if (this.calendar.isRangeFree(
      this.calendar.createDummySlot(0, new Date(0)), this.calendarItem.time, duration)) {
      this.calendar.createSlot(this.calendarItem.time, duration);
    } else {
      this.app.dialog.showSnackBar(SB_MSG.ERROR_SPEED_CREATE.replace(REPLACE_STRING, duration.toString()));
    }
  }

  dropListEnterPredicate = () => {
    if (this.calendarItem.isSlot() && this.calendarItem.slotStart) {
      return false;
    }
    return true;
  };

  drop(event: CdkDragDrop<Slot>): void {
    if (this.drag) {
      this.exited();
      this.dialog.moveSlotWithAlertIfBookedWithUpdateIfRequired(event.item.data, this.calendarItem.time, event.item.data.duration);
    }
  }

  enter(event: CdkDragEnter<Slot>): void {
    this.drag = this.canEnter(event.item.data);
  }

  canEnter(slot: Slot): boolean {
    if (slot.free && (this.calendarItem.time.getTime() < (new Date()).getTime())) {
      return false;
    }
    if (this.calendarItem.isSlot() && this.calendarItem.slotStart && this.calendarItem.slot === slot) {
      return false;
    }
    return this.calendar.isRangeFree(slot, this.calendarItem.time, slot.duration);
    return false;
  }

  pointerEnter(): void {
    this.showTimeEnter = true;
    this.app.sleep(3).finally(() => {
      this.showTimeEnter = false;
    });
  }

  pointerClick(): void {
    this.showTimeClick = true;
    this.app.sleep(3).finally(() => {
      this.showTimeClick = false;
    });
  }

  exited(): void {
    this.drag = false;
    this.showTimeEnter = false;
  }

  exitedDelay(): void {
    this.showTimeEnter = false;
    if (this.drag) {
      this.app.sleepMS(1).finally(() => {
        this.exited();
      });
    }
  }

}
