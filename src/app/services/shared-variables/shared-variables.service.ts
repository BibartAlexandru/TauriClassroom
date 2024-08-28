import { ICourse } from "../../models/course.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CoursesService } from "../courses/courses.service";

@Injectable({
  providedIn: "root",
})
export class SharedVariablesService {
  openedCourse: BehaviorSubject<ICourse | null> =
    new BehaviorSubject<ICourse | null>(null);
  isCoursesSidebarDocked: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  constructor(private courseService: CoursesService) {
    courseService.getCourseWithId(0).subscribe((course) => {
      this.openedCourse.next(course);
    });
  }

  getOpenedCourse(): Observable<ICourse | null> {
    return this.openedCourse.asObservable();
  }

  setOpenedCourse(value: ICourse | null) {
    //console.log(value);
    this.openedCourse.next(value);
  }

  getIsCoursesSidebarDocked(): Observable<boolean> {
    return this.isCoursesSidebarDocked.asObservable();
  }

  setIsCoursesSidebarDocked(value: boolean) {
    this.isCoursesSidebarDocked.next(value);
  }
}
