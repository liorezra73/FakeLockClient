import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMainFeedComponent } from './post-main-feed.component';
import { SchemaMetadata, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PostMainFeedComponent', () => {
  let component: PostMainFeedComponent;
  let fixture: ComponentFixture<PostMainFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostMainFeedComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMainFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
