import {Component, Input, OnInit} from '@angular/core';
import {BaseAppService} from '../../../../../../../libs/src/lib/base-app/base-app.service';
import {BookingService} from '../../booking.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-input-data',
  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.scss']
})
export class InputDataComponent implements OnInit {

  @Input() stepper: MatStepper;
  @Input() formGroup: FormGroup;

  readonly FORMNAME_NAME = 'name';
  readonly FORMNAME_MAIL = 'mail';
  readonly FORMNAME_TEL = 'tel';

  constructor(public app: BaseAppService, public booking: BookingService) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.FORMNAME_NAME, new FormControl(this.booking.inputDataName, Validators.required));
    this.formGroup.addControl(this.FORMNAME_MAIL, new FormControl(this.booking.inputDataMail, Validators.required));
    this.formGroup.addControl(this.FORMNAME_TEL, new FormControl(this.booking.inputDataTel));
  }

  resetForm(): void {
    this.formGroup.get(this.FORMNAME_NAME).setValue(this.booking.inputDataName);
    this.formGroup.get(this.FORMNAME_MAIL).setValue(this.booking.inputDataMail);
    this.formGroup.get(this.FORMNAME_TEL).setValue(this.booking.inputDataTel);
  }

  setData(form: string): void {
    if (this.formGroup.get(form).valid) {
      const value = this.formGroup.get(form).value;
      if (form === this.FORMNAME_NAME) {
        this.booking.inputDataName = value;
      } else if (form === this.FORMNAME_MAIL) {
        this.booking.inputDataMail = value;
      } else if (form === this.FORMNAME_TEL) {
        this.booking.inputDataTel = value;
      }
    }
  }

}
