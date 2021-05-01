import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChooseSlotFilterComponent} from './choose-slot-filter.component';

describe('ChooseSlotFilterComponent', () => {
  let component: ChooseSlotFilterComponent;
  let fixture: ComponentFixture<ChooseSlotFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseSlotFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSlotFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
