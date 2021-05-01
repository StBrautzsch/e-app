import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UseWithoutLoginComponent} from './use-without-login.component';

describe('UseWithoutLoginComponent', () => {
  let component: UseWithoutLoginComponent;
  let fixture: ComponentFixture<UseWithoutLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseWithoutLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseWithoutLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
