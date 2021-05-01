import {Component, Inject, OnInit} from '@angular/core';
import {AbstractSlotEditDialogComponent, SlotEditDialogData} from '../abstract-slot-edit-dialog.component';
import {BaseAppService} from '../../../../../../libs/src/lib/base-app/base-app.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-slot-edit-dialog',
  templateUrl: './slot-edit-dialog.component.html',
  styleUrls: ['./slot-edit-dialog.component.scss']
})
export class SlotEditDialogComponent extends AbstractSlotEditDialogComponent implements OnInit {

  constructor(public app: BaseAppService, protected dialogRef: MatDialogRef<AbstractSlotEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SlotEditDialogData) {
    super(app, dialogRef, data);
  }

  ngOnInit(): void {
  }

  isChange(): boolean {
    if (this.data.slot.start.getTime() !== this.calcStartTime().getTime()) {
      return true;
    }
    if (this.data.slot.duration !== this.hourMinToMin()) {
      return true;
    }
    return false;
  }

  save(): void {
    if (this.check()) {
      this.data.newDuration = this.hourMinToMin();
      this.data.newStart = this.calcStartTime();
    }
  }

}
