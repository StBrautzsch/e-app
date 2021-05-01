import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SlotDetailsDialogComponent} from './slot-details-dialog.component';

describe('SlotDetailsDialogComponent', () => {
  let component: SlotDetailsDialogComponent;
  let fixture: ComponentFixture<SlotDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
