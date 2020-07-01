import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsNavBarComponent } from './ps-nav-bar.component';

describe('PsNavBarComponent', () => {
  let component: PsNavBarComponent;
  let fixture: ComponentFixture<PsNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
