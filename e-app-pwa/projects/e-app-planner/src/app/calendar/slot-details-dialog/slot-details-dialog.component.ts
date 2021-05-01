import {Component, Inject, OnInit} from '@angular/core';
import {Slot} from '../../../../../libs/src/lib/data/slot';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../../../../libs/src/lib/api/api-service/api.service';

export enum SlotDetailsDialogResult {NONE, EDIT, DELETE}

export interface SlotDetailsDialogData {
  slot: Slot;
  result: SlotDetailsDialogResult;
}

@Component({
  selector: 'app-slot-details-dialog',
  templateUrl: './slot-details-dialog.component.html',
  styleUrls: ['./slot-details-dialog.component.scss']
})
export class SlotDetailsDialogComponent implements OnInit {

  constructor(private api: ApiService, public dialogRef: MatDialogRef<SlotDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SlotDetailsDialogData) {
  }

  ngOnInit(): void {
  }

  mailto(): void {
    location.href = 'mailto:' + this.data.slot.bookingClientMail + '?subject=Termin ' + this.data.slot.start.toLocaleString();
  }

  tel(): void {
    location.href = 'tel:' + this.data.slot.bookingClientTel;
  }

  edit(): void {
    this.data.result = SlotDetailsDialogResult.EDIT;
  }

  del(): void {
    this.data.result = SlotDetailsDialogResult.DELETE;
  }

  isPast(): boolean {
    if (this.data.slot.start.getTime() < (new Date()).getTime()) {
      return true;
    }
    return false;
  }

  iCal(): void {
    this.api.castPlanner().slotICalPut(this.data.slot.id).subscribe(
      (ret) => window.location.href = this.api.createUrl(this.api.URL_ICAL) + ret,
      () => this.dialogRef.close());
  }

}
