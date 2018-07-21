import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedetailsComponent } from './feedetails.component';

describe('FeedetailsComponent', () => {
  let component: FeedetailsComponent;
  let fixture: ComponentFixture<FeedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
