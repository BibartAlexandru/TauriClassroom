import { TestBed } from '@angular/core/testing';

import { CoursePagePostsService } from './course-page-posts.service';

describe('CoursePagePostsService', () => {
  let service: CoursePagePostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursePagePostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
