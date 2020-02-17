import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMainFeedComponent } from './post-main-feed.component';

describe('PostMainFeedComponent', () => {
  let component: PostMainFeedComponent;
  let fixture: ComponentFixture<PostMainFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostMainFeedComponent ]
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
