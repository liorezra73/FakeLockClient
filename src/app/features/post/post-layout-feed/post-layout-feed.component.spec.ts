import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLayoutFeedComponent } from './post-layout-feed.component';

describe('PostLayoutFeedComponent', () => {
  let component: PostLayoutFeedComponent;
  let fixture: ComponentFixture<PostLayoutFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLayoutFeedComponent ]
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
