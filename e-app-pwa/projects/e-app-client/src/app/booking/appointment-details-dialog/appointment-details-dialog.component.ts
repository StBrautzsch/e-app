import {Component, Inject, OnInit} from '@angular/core';
import {Appointment} from '../../../../../libs/src/lib/data/slot';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../../../../libs/src/lib/api/api-service/api.service';
import {Observable} from 'rxjs';

export enum AppointmentDetailsDialogResult {NONE, DELETE}

export interface AppointmentDetailsDialogData {
  appointment: Appointment;
  reference: string;
  result: AppointmentDetailsDialogResult;
}

@Component({
  selector: 'app-appointment-details-dialog',
  templateUrl: './appointment-details-dialog.component.html',
  styleUrls: ['./appointment-details-dialog.component.scss']
})
export class AppointmentDetailsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AppointmentDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AppointmentDetailsDialogData, private api: ApiService) {
  }

  ngOnInit(): void {
  }

  mailto(): void {
    location.href = 'mailto:' + this.data.appointment.bookingPlannerMail
      + '?subject=Termin ' + this.data.appointment.start.toLocaleString();
  }

  tel(): void {
    location.href = 'tel:' + this.data.appointment.bookingPlannerTel;
  }

  storno(): void {
    this.data.result = AppointmentDetailsDialogResult.DELETE;
  }

  iCal(): void {
    if (this.data.reference) {
      this.iCalSubscribe(this.api.castClient().appointmentAnonymICalPut(this.data.reference));
    } else {
      this.iCalSubscribe(this.api.castClient().appointmentICalPut(this.data.appointment.id));
    }
  }

  private iCalSubscribe(iCal: Observable<string>): void {
    iCal.subscribe(
      (ret) => window.location.href = this.api.createUrl(this.api.URL_ICAL) + ret,
      () => this.dialogRef.close());
  }

}
