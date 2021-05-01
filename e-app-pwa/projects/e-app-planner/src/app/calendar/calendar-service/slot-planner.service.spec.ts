import {TestBed} from '@angular/core/testing';

import {SlotPlannerService} from './slot-planner.service';

describe('SlotPlannerService', () => {
  let service: SlotPlannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotPlannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
