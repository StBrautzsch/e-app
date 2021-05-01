import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DefaultDialogData, DefaultDialogType} from '../defaut-dialog-data';

@Component({
  selector: 'lib-default-dialog',
  templateUrl: './default-dialog.component.html',
  styleUrls: ['./default-dialog.component.scss']
})
export class DefaultDialogComponent implements OnInit {

  tDefaultDialogType = DefaultDialogType;

  constructor(public dialogRef: MatDialogRef<DefaultDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DefaultDialogData) {
  }

  ngOnInit(): void {
  }

}
