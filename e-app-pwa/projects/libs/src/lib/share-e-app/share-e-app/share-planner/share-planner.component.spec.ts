import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SharePlannerComponent} from './share-planner.component';

describe('SharePlannerComponent', () => {
  let component: SharePlannerComponent;
  let fixture: ComponentFixture<SharePlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharePlannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharePlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
