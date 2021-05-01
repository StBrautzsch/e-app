import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import {BaseAppService} from '../../../../../../../libs/src/lib/base-app/base-app.service';
import {BookingService} from '../../booking.service';
import {BookingSlot} from '../../../../../../../libs/src/lib/data/booking-slot';

@Component({
  selector: 'app-choose-slot',
  templateUrl: './choose-slot.component.html',
  styleUrls: ['./choose-slot.component.scss']
})
export class ChooseSlotComponent implements OnInit {

  @Input() stepper: MatStepper;
  @Input() formGroup: FormGroup;

  updating = false;

  readonly FORMNAME_SLOT_LIST = 'slotList';

  constructor(public app: BaseAppService, public booking: BookingService) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.FORMNAME_SLOT_LIST, new FormControl('', Validators.required));
  }

  change(): void {
    this.booking.selectedSlot = this.getSelectedSlot();
    if (this.formGroup.valid) {
      this.stepper.next();
    }
  }

  update(): void {
    if (this.booking.selectedPlannerPerson !== null) {
      this.updating = true;
      this.booking.updateSlots(this.booking.selectedPlannerPerson.id).subscribe(() => this.updating = false);
    }
  }

  private getSelectedSlot(): BookingSlot {
    if (this.formGroup.valid && (this.formGroup.get(this.FORMNAME_SLOT_LIST).value)) {
      return this.booking.getSlot(this.formGroup.get(this.FORMNAME_SLOT_LIST).value[0]);
    }
    return null;
  }

  isSideFilter(): boolean {
    if (this.app.calcContentWidth() > 600) {
      return true;
    }
    return false;
  }

  calcHeight(): number {
    if (this.isSideFilter()) {
      return 305;
    }
    return 385;
  }

}
