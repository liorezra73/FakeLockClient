import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertagInputComponent } from './usertag-input.component';
import { SchemaMetadata, NO_ERRORS_SCHEMA } from '@angular/core';

describe('UsertagInputComponent', () => {
  let component: UsertagInputComponent;
  let fixture: ComponentFixture<UsertagInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertagInputComponent ],
      schemas: [NO_ERRORS_SCHEMA]
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
