import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMapFeedComponent } from './post-map-feed.component';
import { SchemaMetadata, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PostMapFeedComponent', () => {
  let component: PostMapFeedComponent;
  let fixture: ComponentFixture<PostMapFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostMapFeedComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMapFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
