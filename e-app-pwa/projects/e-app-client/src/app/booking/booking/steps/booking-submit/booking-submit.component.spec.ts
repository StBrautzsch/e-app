import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookingSubmitComponent} from './booking-submit.component';

describe('BookingSubmitComponent', () => {
  let component: BookingSubmitComponent;
  let fixture: ComponentFixture<BookingSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
