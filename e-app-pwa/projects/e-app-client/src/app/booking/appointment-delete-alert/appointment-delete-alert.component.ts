import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Appointment} from '../../../../../libs/src/lib/data/slot';

export interface AppointmentDeleteAlertData {
  appointment: Appointment;
}

@Component({
  selector: 'app-appointment-delete-alert',
  templateUrl: './appointment-delete-alert.component.html',
  styleUrls: ['./appointment-delete-alert.component.scss']
})
export class AppointmentDeleteAlertComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AppointmentDeleteAlertComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AppointmentDeleteAlertData) {
  }

  ngOnInit(): void {
  }

}
