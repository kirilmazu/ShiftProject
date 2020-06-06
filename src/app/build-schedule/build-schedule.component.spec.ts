import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildScheduleComponent } from './build-schedule.component';

describe('BuildScheduleComponent', () => {
  let component: BuildScheduleComponent;
  let fixture: ComponentFixture<BuildScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
