import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DayLabelComponent} from './day-label.component';

describe('DayLabelComponent', () => {
  let component: DayLabelComponent;
  let fixture: ComponentFixture<DayLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
