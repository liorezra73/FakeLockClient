import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFeedToolBarComponent } from './post-feed-tool-bar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PostFeedToolBarComponent', () => {
  let component: PostFeedToolBarComponent;
  let fixture: ComponentFixture<PostFeedToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFeedToolBarComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFeedToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
