import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLocationInputComponent } from "./FormLocationInputComponent";

describe('FormLocationInputComponent', () => {
  let component: FormLocationInputComponent;
  let fixture: ComponentFixture<FormLocationInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLocationInputComponent ]
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
