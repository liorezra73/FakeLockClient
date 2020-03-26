import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CommentListComponent } from "./comment-list.component";
import { SchemaMetadata, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommentService } from "src/app/common/services/comment.service";
import { ToastrService, ToastrModule } from "ngx-toastr";
import { HttpClient, HttpClientModule } from "@angular/common/http";

describe("CommentListComponent", () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentListComponent],
      providers: [
        { provide: CommentService, useClass: CommentService },
        { provide: ToastrService, useClass: ToastrService },
        { provide: HttpClient, useClass: HttpClient }
      ],
      imports: [ToastrModule.forRoot({ positionClass: "toast-top-center" }), HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  // TestBed.overrideComponent(CommentListComponent, {
  //   set: {
  //     providers: [
  //       { provide: CommentService, useClass: CommentService },
  //       { provide: ToastrService, useClass: ToastrService }
  //     ]
  //   }
  // });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
