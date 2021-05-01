import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Slot} from '../../../../../libs/src/lib/data/slot';

export interface SlotDeleteAlertDialogData {
  slot: Slot;
  notify: boolean;
}

@Component({
  selector: 'app-slot-delete-alert-dialog',
  templateUrl: './slot-delete-alert-dialog.component.html',
  styleUrls: ['./slot-delete-alert-dialog.component.scss']
})
export class SlotDeleteAlertDialogComponent implements OnInit {

  readonly now = new Date();

  constructor(public dialogRef: MatDialogRef<SlotDeleteAlertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SlotDeleteAlertDialogData) {
  }

  ngOnInit(): void {
  }

}
