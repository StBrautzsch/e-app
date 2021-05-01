import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookingAuthComponent} from './booking-auth.component';

describe('BookingAuthComponent', () => {
  let component: BookingAuthComponent;
  let fixture: ComponentFixture<BookingAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
