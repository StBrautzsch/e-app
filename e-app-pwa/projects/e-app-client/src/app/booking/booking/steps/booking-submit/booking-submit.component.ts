import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatStepper} from '@angular/material/stepper';
import {BaseAppService} from '../../../../../../../libs/src/lib/base-app/base-app.service';
import {AccountService} from '../../../../../../../libs/src/lib/account/account-service/account-service';
import {BookingService} from '../../booking.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-booking-submit',
  templateUrl: './booking-submit.component.html',
  styleUrls: ['./booking-submit.component.scss']
})
export class BookingSubmitComponent implements OnInit {

  @Input() stepper: MatStepper;
  @Input() formGroup: FormGroup;

  @Output() bookingEvent = new EventEmitter<number>();

  readonly FORMNAME_COMMENT = 'comment';
  readonly FORMNAME_CHECK = 'check';

  constructor(public app: BaseAppService, public account: AccountService, public booking: BookingService) {
  }

  ngOnInit(): void {
    if (!this.account.isAuth()) {
      this.formGroup.addControl(this.FORMNAME_CHECK, new FormControl(false, Validators.requiredTrue));
    }
    this.formGroup.addControl(this.FORMNAME_COMMENT, new FormControl(this.booking.submitComment));
  }

  bookingSubmit(): void {
    if (this.account.isAuth()) {
      this.booking.bookingAuth();
    } else {
      this.booking.bookingAnonym();
    }
    this.bookingEvent.emit(1);
  }

  setData(): void {
    if (this.formGroup.get(this.FORMNAME_COMMENT).valid) {
      this.booking.submitComment = this.formGroup.get(this.FORMNAME_COMMENT).value;
    }
  }

}
