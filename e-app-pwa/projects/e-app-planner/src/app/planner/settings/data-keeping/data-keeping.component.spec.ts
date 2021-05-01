import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataKeepingComponent} from './data-keeping.component';

describe('DataKeepingComponent', () => {
  let component: DataKeepingComponent;
  let fixture: ComponentFixture<DataKeepingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataKeepingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataKeepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
