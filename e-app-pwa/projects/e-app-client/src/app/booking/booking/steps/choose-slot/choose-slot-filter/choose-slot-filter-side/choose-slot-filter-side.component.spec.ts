import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChooseSlotFilterSideComponent} from './choose-slot-filter-side.component';

describe('ChooseSlotFilterSideComponent', () => {
  let component: ChooseSlotFilterSideComponent;
  let fixture: ComponentFixture<ChooseSlotFilterSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseSlotFilterSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSlotFilterSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
