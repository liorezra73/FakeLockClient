import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLayoutFeedComponent } from './post-layout-feed.component';
import { SchemaMetadata, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PostLayoutFeedComponent', () => {
  let component: PostLayoutFeedComponent;
  let fixture: ComponentFixture<PostLayoutFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLayoutFeedComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLayoutFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
