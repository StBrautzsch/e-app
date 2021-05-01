import {Injectable} from '@angular/core';
import {BaseAppService} from '../../../../libs/src/lib/base-app/base-app.service';
import {MatDialog} from '@angular/material/dialog';
import {Appointment} from '../../../../libs/src/lib/data/slot';
import {
  AppointmentDetailsDialogComponent,
  AppointmentDetailsDialogData,
  AppointmentDetailsDialogResult
} from './appointment-details-dialog/appointment-details-dialog.component';
import {Observable, Observer} from 'rxjs';
import {observerNextAndComplete} from '../../../../libs/src/lib/tools';
import {AppointmentDeleteAlertComponent, AppointmentDeleteAlertData} from './appointment-delete-alert/appointment-delete-alert.component';
import {REPLACE_STRING, REPLACE_STRING_DATE, REPLACE_STRING_TIME, SB_MSG} from '../../../../libs/src/lib/msg';

@Injectable({
  providedIn: 'root'
})
export class BookingDialogService {

  constructor(private app: BaseAppService, private dialog: MatDialog) {
  }

  showAppointmentDetailsDialogWithRef(appointment: Appointment, reference: string): Observable<AppointmentDetailsDialogResult> {
    const data: AppointmentDetailsDialogData = {appointment, reference, result: AppointmentDetailsDialogResult.NONE};
    return new Observable((observer: Observer<AppointmentDetailsDialogResult>) => {
      this.dialog.open(AppointmentDetailsDialogComponent, {data}).afterClosed()
        .subscribe(() => observerNextAndComplete(observer, data.result));
    });
  }

  showAppointmentDetailsDialog(appointment: Appointment): Observable<AppointmentDetailsDialogResult> {
    return this.showAppointmentDetailsDialogWithRef(appointment, null);
  }

  showAppointmentDeleteAlert(appointment: Appointment): Observable<boolean> {
    const data: AppointmentDeleteAlertData = {appointment};
    return new Observable((observer: Observer<boolean>) => {
      this.dialog.open(AppointmentDeleteAlertComponent, {data}).afterClosed()
        .subscribe((ret: boolean) => observerNextAndComplete(observer, ret));
    });
  }

  deleteAppointmentSuccessfulSnackbar(appointment: Appointment): void {
    const msg = SB_MSG.STORNO
      .replace(REPLACE_STRING, appointment.mergePlannerName())
      .replace(REPLACE_STRING_DATE, this.app.datePipe.transform(appointment.start, 'longDate'))
      .replace(REPLACE_STRING_TIME, this.app.datePipe.transform(appointment.start, 'shortTime'));
    this.app.dialog.showSnackBar(msg);
  }

}
