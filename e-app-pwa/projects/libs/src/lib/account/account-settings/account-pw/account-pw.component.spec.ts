import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountPwComponent} from './account-pw.component';

describe('AccountPwComponent', () => {
  let component: AccountPwComponent;
  let fixture: ComponentFixture<AccountPwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
