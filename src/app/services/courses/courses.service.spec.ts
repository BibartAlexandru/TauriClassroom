import { CoursesService } from "./courses.service";
import { TestBed } from "@angular/core/testing";

describe("CoursesService", () => {
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
