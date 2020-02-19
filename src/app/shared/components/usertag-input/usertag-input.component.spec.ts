import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertagInputComponent } from './usertag-input.component';

describe('UsertagInputComponent', () => {
  let component: UsertagInputComponent;
  let fixture: ComponentFixture<UsertagInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertagInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertagInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
