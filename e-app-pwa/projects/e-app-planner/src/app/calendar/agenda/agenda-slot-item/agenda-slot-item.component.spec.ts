import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AgendaSlotItemComponent} from './agenda-slot-item.component';

describe('AgendaSlotItemComponent', () => {
  let component: AgendaSlotItemComponent;
  let fixture: ComponentFixture<AgendaSlotItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaSlotItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaSlotItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
