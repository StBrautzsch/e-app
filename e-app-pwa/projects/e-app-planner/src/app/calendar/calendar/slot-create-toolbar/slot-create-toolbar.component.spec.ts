import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SlotCreateToolbarComponent} from './slot-create-toolbar.component';

describe('SlotCreateToolbarComponent', () => {
  let component: SlotCreateToolbarComponent;
  let fixture: ComponentFixture<SlotCreateToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotCreateToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotCreateToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
