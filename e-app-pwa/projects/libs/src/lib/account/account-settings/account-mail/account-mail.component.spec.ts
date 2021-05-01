import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountMailComponent} from './account-mail.component';

describe('AccountMailComponent', () => {
  let component: AccountMailComponent;
  let fixture: ComponentFixture<AccountMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
