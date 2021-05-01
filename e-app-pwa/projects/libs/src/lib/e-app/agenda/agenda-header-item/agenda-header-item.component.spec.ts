import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AgendaHeaderItemComponent} from './agenda-header-item.component';

describe('AgendaHeaderItemComponent', () => {
  let component: AgendaHeaderItemComponent;
  let fixture: ComponentFixture<AgendaHeaderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaHeaderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaHeaderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
