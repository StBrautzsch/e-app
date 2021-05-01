import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrototypeInfoComponent} from './prototype-info.component';

describe('PrototypeInfoComponent', () => {
  let component: PrototypeInfoComponent;
  let fixture: ComponentFixture<PrototypeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrototypeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrototypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
