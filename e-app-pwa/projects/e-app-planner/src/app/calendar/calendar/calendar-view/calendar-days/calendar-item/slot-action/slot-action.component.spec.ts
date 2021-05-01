import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SlotActionComponent} from './slot-action.component';

describe('SlotActionComponent', () => {
  let component: SlotActionComponent;
  let fixture: ComponentFixture<SlotActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
