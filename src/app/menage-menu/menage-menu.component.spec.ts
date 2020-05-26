import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenageMenuComponent } from './menage-menu.component';

describe('MenageMenuComponent', () => {
  let component: MenageMenuComponent;
  let fixture: ComponentFixture<MenageMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenageMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
