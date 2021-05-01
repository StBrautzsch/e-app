import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PasswortInputDialogComponent} from './passwort-input-dialog.component';

describe('PasswortInputDialogComponent', () => {
  let component: PasswortInputDialogComponent;
  let fixture: ComponentFixture<PasswortInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswortInputDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswortInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
