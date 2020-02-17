import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMapFeedComponent } from './post-map-feed.component';

describe('PostMapFeedComponent', () => {
  let component: PostMapFeedComponent;
  let fixture: ComponentFixture<PostMapFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostMapFeedComponent ]
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
