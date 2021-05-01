import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SlotEditDialogComponent} from './slot-edit-dialog.component';

describe('SlotEditDialogComponent', () => {
  let component: SlotEditDialogComponent;
  let fixture: ComponentFixture<SlotEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
