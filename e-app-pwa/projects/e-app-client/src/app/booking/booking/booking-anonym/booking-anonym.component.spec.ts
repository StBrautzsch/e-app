import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookingAnonymComponent} from './booking-anonym.component';

describe('BookingComponent', () => {
  let component: BookingAnonymComponent;
  let fixture: ComponentFixture<BookingAnonymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingAnonymComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingAnonymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
