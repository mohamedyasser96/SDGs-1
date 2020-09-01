import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentRequestsNgoComponent } from './sent-requests-ngo.component';

describe('SentRequestsNgoComponent', () => {
  let component: SentRequestsNgoComponent;
  let fixture: ComponentFixture<SentRequestsNgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentRequestsNgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentRequestsNgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
