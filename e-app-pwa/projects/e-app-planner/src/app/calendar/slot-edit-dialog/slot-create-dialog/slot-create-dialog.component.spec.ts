import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SlotCreateDialogComponent} from './slot-create-dialog.component';

describe('SlotCreateDialogComponent', () => {
  let component: SlotCreateDialogComponent;
  let fixture: ComponentFixture<SlotCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
