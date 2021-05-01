import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ChoosePersonComponent} from '../steps/choose-person/choose-person.component';
import {ChooseSlotComponent} from '../steps/choose-slot/choose-slot.component';
import {BaseAppService} from '../../../../../../libs/src/lib/base-app/base-app.service';
import {MatStepper} from '@angular/material/stepper';
import {StepperSelectionEvent} from '@angular/cdk/stepper';
import {FormGroup} from '@angular/forms';
import {AccountService} from '../../../../../../libs/src/lib/account/account-service/account-service';
import {InputDataComponent} from '../steps/input-data/input-data.component';
import {BookingService} from '../booking.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-booking-stepper',
  templateUrl: './booking-stepper.component.html',
  styleUrls: ['./booking-stepper.component.scss']
})
export class BookingStepperComponent implements OnInit, AfterViewInit {

  @ViewChild(ChoosePersonComponent) choosePerson: ChoosePersonComponent;
  @ViewChild(ChooseSlotComponent) chooseSlot: ChooseSlotComponent;
  @ViewChild(InputDataComponent) inputData: InputDataComponent;
  @ViewChild(MatStepper) stepper: MatStepper;

  formGroupChoosePerson: FormGroup = new FormGroup({});
  formGroupChooseSlot: FormGroup = new FormGroup({});
  formGroupInputData: FormGroup = new FormGroup({});
  formGroupSubmit: FormGroup = new FormGroup({});

  constructor(public app: BaseAppService, public account: AccountService, public booking: BookingService,
              private location: Location, private route: ActivatedRoute) {
    this.initLocationSubscribe();
    if (this.route.snapshot.queryParams.planner !== undefined) {
      this.booking.personFilter = this.route.snapshot.queryParams.planner;
    } else {
      this.booking.resetPersonFilter();
    }
    this.booking.resetSlotFilter();
  }

  private initLocationSubscribe(): void {
    this.location.subscribe(() => {
      this.route.fragment.subscribe(fragment => {
        if (fragment) {
          this.changeStepper(Number(fragment));
        }
      });
    });
  }

  private changeStepper(fragment: number): void {
    if ((this.stepper.selectedIndex - 1) === fragment) {
      this.stepper.previous();
    }
    if ((this.stepper.selectedIndex + 1) === fragment) {
      this.stepper.next();
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.location.go(this.location.path().split('#')[0] + '#' + this.stepper.selectedIndex.toString());
    this.initStepperChangeSubscribe();
  }

  private initStepperChangeSubscribe(): void {
    this.stepper.selectionChange.subscribe((data: StepperSelectionEvent) => {
      this.location.go(this.location.path().split('#')[0] + '#' + data.selectedIndex.toString());
      if (data.selectedIndex === 0) {
        this.choosePerson.update();
      }
      if (data.selectedIndex === 1) {
        this.chooseSlot.update();
      }
    });
  }

  bookingSubmitAuth(): void {
    this.stepper.reset();
  }

  bookingSubmitAnonym(): void {
    this.stepper.reset();
    this.inputData.resetForm();
  }

}
