import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Slot} from '../../../../../libs/src/lib/data/slot';

export interface SlotMoveAlertDialogData {
  slot: Slot;
  startNew: Date;
  durationNew: number;
  notify: boolean;
}

@Component({
  selector: 'app-slot-move-alert-dialog',
  templateUrl: './slot-move-alert-dialog.component.html',
  styleUrls: ['./slot-move-alert-dialog.component.scss']
})
export class SlotMoveAlertDialogComponent implements OnInit {

  readonly now = new Date();

  constructor(public dialogRef: MatDialogRef<SlotMoveAlertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SlotMoveAlertDialogData) {
  }

  ngOnInit(): void {
  }

  isNewPast(): boolean {
    if (this.data.startNew.getTime() < this.now.getTime()) {
      return true;
    }
    return false;
  }

  isOldPast(): boolean {
    if (this.data.slot.start.getTime() < this.now.getTime()) {
      return true;
    }
    return false;
  }

}
