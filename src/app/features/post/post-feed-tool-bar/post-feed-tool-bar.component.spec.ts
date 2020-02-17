import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFeedToolBarComponent } from './post-feed-tool-bar.component';

describe('PostFeedToolBarComponent', () => {
  let component: PostFeedToolBarComponent;
  let fixture: ComponentFixture<PostFeedToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFeedToolBarComponent ]
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
