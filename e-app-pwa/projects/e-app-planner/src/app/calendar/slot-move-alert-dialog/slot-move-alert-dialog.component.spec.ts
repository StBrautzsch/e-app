import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SlotMoveAlertDialogComponent} from './slot-move-alert-dialog.component';

describe('SlotMoveAlertDialogComponent', () => {
  let component: SlotMoveAlertDialogComponent;
  let fixture: ComponentFixture<SlotMoveAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotMoveAlertDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotMoveAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
