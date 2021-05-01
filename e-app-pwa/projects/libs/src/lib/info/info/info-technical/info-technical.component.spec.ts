import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InfoTechnicalComponent} from './info-technical.component';

describe('TechnicalComponent', () => {
  let component: InfoTechnicalComponent;
  let fixture: ComponentFixture<InfoTechnicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoTechnicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
