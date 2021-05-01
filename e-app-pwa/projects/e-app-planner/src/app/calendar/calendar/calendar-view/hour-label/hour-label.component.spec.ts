import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HourLabelComponent} from './hour-label.component';

describe('HourLabelComponent', () => {
  let component: HourLabelComponent;
  let fixture: ComponentFixture<HourLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
