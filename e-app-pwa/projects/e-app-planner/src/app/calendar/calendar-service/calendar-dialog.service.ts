import {Injectable} from '@angular/core';
import {BaseAppService} from '../../../../../libs/src/lib/base-app/base-app.service';
import {SlotPlannerService} from './slot-planner.service';
import {MatDialog} from '@angular/material/dialog';
import {StartEnd, t} from '../../../../../libs/src/lib/time-tools';
import {SlotEditDialogData} from '../slot-edit-dialog/abstract-slot-edit-dialog.component';
import {SlotCreateDialogComponent} from '../slot-edit-dialog/slot-create-dialog/slot-create-dialog.component';
import {CalendarService} from './calendar.service';
import {
  SlotDetailsDialogComponent,
  SlotDetailsDialogData,
  SlotDetailsDialogResult
} from '../slot-details-dialog/slot-details-dialog.component';
import {SlotEditDialogComponent} from '../slot-edit-dialog/slot-edit-dialog/slot-edit-dialog.component';
import {Slot} from '../../../../../libs/src/lib/data/slot';
import {SlotMoveAlertDialogComponent, SlotMoveAlertDialogData} from '../slot-move-alert-dialog/slot-move-alert-dialog.component';
import {SlotDeleteAlertDialogComponent, SlotDeleteAlertDialogData} from '../slot-delete-alert-dialog/slot-delete-alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CalendarDialogService {

  constructor(private app: BaseAppService, private slots: SlotPlannerService, private calendar: CalendarService,
              private dialog: MatDialog) {
    console.log('CalendarDialogService');
  }

  showSlotCreateDialogStartEndWithUpdateIfRequired(d1: Date, d2: Date): void {
    const dates = new StartEnd(d1, d2);
    const duration = (dates.duration() + this.calendar.interval) / t.MS_PER_MIN;
    this.showSlotCreateDialogWithUpdateIfRequired(new Date(dates.start.getTime()), duration);
  }

  showSlotCreateDialogWithUpdateIfRequired(slotStart: Date, slotDuration: number): void {
    this.calendar.updateSlotsAndCalendarAndWaitWithLastPara().subscribe(() => {
      this.showSlotCreateDialog(slotStart, slotDuration);
    });
  }

  private showSlotCreateDialog(slotStart: Date, slotDuration: number): void {
    const slot = this.calendar.createDummySlot(this.slotCreateCheckDuration(slotDuration), this.slotCreateCheckStart(slotStart));
    const data: SlotEditDialogData =
      {calendar: this.calendar, slot, newDuration: null, newStart: null, newDurationSlot: null, newBreak: null, notify: false};
    this.dialog.open(SlotCreateDialogComponent, {data}).afterClosed()
      .subscribe(() => this.showSlotCreateDialogAfterClosed(data));
  }

  private slotCreateCheckStart(slotStart: Date): Date {
    if (slotStart === null) {
      const now = new Date(new Date().getTime() + t.MS_PER_HOUR);
      slotStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0, 0);
    }
    return slotStart;
  }

  private slotCreateCheckDuration(slotDuration: number): number {
    if (slotDuration === null) {
      slotDuration = this.calendar.interval / t.MS_PER_MIN;
    }
    return slotDuration;
  }

  private showSlotCreateDialogAfterClosed(data: SlotEditDialogData): void {
    if (!!data.newStart && !!data.newDuration && !!data.newDurationSlot) {
      this.calendar.createSlotsMultiple(data.newStart, data.newDuration, data.newDurationSlot, data.newBreak);
    } else if (!!data.newStart && !!data.newDuration) {
      this.calendar.createSlot(data.newStart, data.newDuration);
    }
  }

  showSlotDetailsDialogWithUpdateIfRequired(id: number): void {
    this.calendar.updateSlotsAndCalendarAndWaitWithLastPara().subscribe(() => {
      this.showSlotDetailsDialog(id);
    });
  }

  private showSlotDetailsDialog(id: number): void {
    const slot = this.slots.getSlotById(id);
    const data: SlotDetailsDialogData = {slot, result: SlotDetailsDialogResult.NONE};
    this.dialog.open(SlotDetailsDialogComponent, {data}).afterClosed()
      .subscribe(() => this.showSlotDetailsDialogAfterClosed(data, slot));
  }

  private showSlotDetailsDialogAfterClosed(data: SlotDetailsDialogData, slot: Slot): void {
    if (data.result === SlotDetailsDialogResult.EDIT) {
      this.showSlotEditDialogWithUpdateIfRequired(slot.id);
    }
    if (data.result === SlotDetailsDialogResult.DELETE) {
      this.deleteSlotWithAlertIfBooked(slot);
    }
  }

  showSlotEditDialogWithUpdateIfRequired(id: number): void {
    this.calendar.updateSlotsAndCalendarAndWaitWithLastPara().subscribe(() => {
      this.showSlotEditDialog(id);
    });
  }

  private showSlotEditDialog(id: number): void {
    const slot = this.slots.getSlotById(id);
    const data: SlotEditDialogData =
      {calendar: this.calendar, slot, newStart: null, newDuration: null, newDurationSlot: null, newBreak: null, notify: true};
    this.dialog.open(SlotEditDialogComponent, {data}).afterClosed()
      .subscribe(() => this.showSlotEditDialogAfterClosed(data, slot));
  }

  private showSlotEditDialogAfterClosed(data: SlotEditDialogData, slot: Slot): void {
    if (!!data.newStart && !!data.newDuration) {
      this.calendar.moveSlot(slot, data.newStart, data.newDuration, data.notify);
    }
  }

  moveSlotWithAlertIfBookedWithUpdateIfRequired(slot: Slot, startNew: Date, durationNew: number): void {
    this.calendar.updateSlotsAndCalendarAndWaitWithLastPara().subscribe(() => {
      this.moveSlotWithAlertIfBooked(slot, startNew, durationNew);
    });
  }

  private moveSlotWithAlertIfBooked(slot: Slot, startNew: Date, durationNew: number): void {
    if (slot.free) {
      return this.calendar.moveSlot(slot, startNew, durationNew, false);
    }
    this.moveSlotWithAlertBooked(slot, startNew, durationNew);
  }

  private moveSlotWithAlertBooked(slot: Slot, startNew: Date, durationNew: number): void {
    const data: SlotMoveAlertDialogData = {durationNew, notify: true, slot, startNew};
    this.dialog.open(SlotMoveAlertDialogComponent, {data}).afterClosed().subscribe((ret) => {
      if (ret) {
        this.calendar.moveSlot(slot, startNew, durationNew, data.notify);
      }
    });
  }

  deleteSlotWithAlertIfBooked(slot: Slot): void {
    if (slot.free) {
      return this.calendar.deleteSlot(slot, false);
    }
    this.deleteSlotWithAlertBooked(slot);
  }

  private deleteSlotWithAlertBooked(slot: Slot): void {
    const data: SlotDeleteAlertDialogData = {notify: true, slot};
    this.dialog.open(SlotDeleteAlertDialogComponent, {data}).afterClosed().subscribe((ret) => {
      if (ret) {
        this.calendar.deleteSlot(slot, data.notify);
      }
    });
  }

}
