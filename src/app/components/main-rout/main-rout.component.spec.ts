import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRoutComponent } from './main-rout.component';

describe('MainRoutComponent', () => {
  let component: MainRoutComponent;
  let fixture: ComponentFixture<MainRoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainRoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
