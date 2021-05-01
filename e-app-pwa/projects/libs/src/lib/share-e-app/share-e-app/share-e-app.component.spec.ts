import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShareEAppComponent} from './share-e-app.component';

describe('ShareEAppComponent', () => {
  let component: ShareEAppComponent;
  let fixture: ComponentFixture<ShareEAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareEAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareEAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
