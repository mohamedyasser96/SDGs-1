import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedRequestsNgoComponent } from './recieved-requests-ngo.component';

describe('RecievedRequestsNgoComponent', () => {
  let component: RecievedRequestsNgoComponent;
  let fixture: ComponentFixture<RecievedRequestsNgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievedRequestsNgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievedRequestsNgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
