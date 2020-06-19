import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsProfileComponent } from './ps-profile.component';

describe('PsProfileComponent', () => {
  let component: PsProfileComponent;
  let fixture: ComponentFixture<PsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
