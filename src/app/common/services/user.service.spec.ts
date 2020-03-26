import { TestBed, getTestBed } from "@angular/core/testing";

import { UserService } from "./user.service";
import { AuthHttpProxyService } from "../proxies/auth-http-proxy.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import CONFIG, { APP_CONFIG } from "./config.service";

describe("UserService", () => {
  let userService: UserService;
  let httpMock: HttpTestingController;
  let injector: TestBed;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: APP_CONFIG, useValue: CONFIG },
        { provide: userService, useClass: UserService }
      ]
    });
    injector = getTestBed();
    userService = injector.get(userService);
    httpMock = injector.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  describe("#getUsersByUserName", () => {
    it("should return an Observable<User[]>", () => {
      const dummyUsers = [{ login: "John" }, { login: "Doe" }];
      const mockUser = [{id:1, username: "mockUsername" }];

      userService.getUsersByUsername(mockUser[0].username).subscribe(users => {
        console.log(users)
        // expect(users).toBe([mockUser]);
      });
      const req = httpMock.expectOne(
        `${userService.usersUrl}?username=${mockUser[0].username}`
      );
      expect(req.request.method).toBe("GET");
      req.flush(mockUser);
    });
  });
});
