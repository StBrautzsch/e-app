import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SlotDeleteAlertDialogComponent} from './slot-delete-alert-dialog.component';

describe('SlotDeleteAlertDialogComponent', () => {
  let component: SlotDeleteAlertDialogComponent;
  let fixture: ComponentFixture<SlotDeleteAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotDeleteAlertDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotDeleteAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
