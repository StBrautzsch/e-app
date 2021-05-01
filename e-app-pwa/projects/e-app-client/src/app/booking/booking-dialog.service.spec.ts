import {TestBed} from '@angular/core/testing';

import {BookingDialogService} from './booking-dialog.service';

describe('BookingDialogService', () => {
  let service: BookingDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
