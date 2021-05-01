import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MsgDivComponent} from './msg-div.component';

describe('MsgDivComponent', () => {
  let component: MsgDivComponent;
  let fixture: ComponentFixture<MsgDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgDivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
