import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ICalFeedsComponent} from './i-cal-feeds.component';

describe('ICalFeedsComponent', () => {
  let component: ICalFeedsComponent;
  let fixture: ComponentFixture<ICalFeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ICalFeedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ICalFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
