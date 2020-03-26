import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLocationInputComponent } from "./form-location-input.component";
import { SchemaMetadata, NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormLocationInputComponent', () => {
  let component: FormLocationInputComponent;
  let fixture: ComponentFixture<FormLocationInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLocationInputComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLocationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
