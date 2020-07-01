import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoNavBarComponent } from './ngo-nav-bar.component';

describe('NgoNavBarComponent', () => {
  let component: NgoNavBarComponent;
  let fixture: ComponentFixture<NgoNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgoNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgoNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
