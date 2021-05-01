import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlannerPerson} from '../../../../../../../libs/src/lib/data/planner-person';
import {BookingService} from '../../booking.service';
import {BaseAppService} from '../../../../../../../libs/src/lib/base-app/base-app.service';
import {MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-choose-person',
  templateUrl: './choose-person.component.html',
  styleUrls: ['./choose-person.component.scss']
})
export class ChoosePersonComponent implements OnInit {

  @Input() stepper: MatStepper;
  @Input() formGroup: FormGroup;

  updating = false;

  readonly FORMNAME_PERSON_LIST = 'personList';

  constructor(public app: BaseAppService, public booking: BookingService) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.FORMNAME_PERSON_LIST, new FormControl('', Validators.required));
    this.update();
  }

  update(): void {
    this.updating = true;
    this.booking.updatePlannerPersons().subscribe(() => this.updating = false);
  }

  change(): void {
    this.booking.selectedPlannerPerson = this.getSelectedPlanner();
    if (this.formGroup.valid) {
      this.stepper.next();
    }
  }

  private getSelectedPlanner(): PlannerPerson {
    if (this.formGroup.valid && (this.formGroup.get(this.FORMNAME_PERSON_LIST).value)) {
      return this.booking.getPlannerPerson(this.formGroup.get(this.FORMNAME_PERSON_LIST).value[0]);
    }
    return null;
  }

}
