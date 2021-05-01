import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InfoLegalComponent} from './info-legal.component';

describe('InfoLegalComponent', () => {
  let component: InfoLegalComponent;
  let fixture: ComponentFixture<InfoLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoLegalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
