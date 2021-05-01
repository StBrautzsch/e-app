import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShareClientComponent} from './share-client.component';

describe('ShareClientComponent', () => {
  let component: ShareClientComponent;
  let fixture: ComponentFixture<ShareClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
