import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RenewLoginComponent} from './renew-login.component';

describe('RenewLoginComponent', () => {
  let component: RenewLoginComponent;
  let fixture: ComponentFixture<RenewLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
