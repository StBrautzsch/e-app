import {TestBed} from '@angular/core/testing';

import {CalendarDialogService} from './calendar-dialog.service';

describe('CalendarDialogService', () => {
  let service: CalendarDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
