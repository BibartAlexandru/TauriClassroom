import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ICourse } from "./models/course.model";

@Injectable({
  providedIn: "root",
})
export class SharedVariablesService {
  openedCourse: BehaviorSubject<ICourse | null> =
    new BehaviorSubject<ICourse | null>(null);
  isCoursesSidebarDocked: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor() {}

  getOpenedCourse(): Observable<ICourse | null> {
    return this.openedCourse.asObservable();
  }

  setOpenedCourse(value: ICourse | null) {
    this.openedCourse.next(value);
  }

  getIsCoursesSidebarDocked(): Observable<boolean> {
    return this.isCoursesSidebarDocked.asObservable();
  }

  setIsCoursesSidebarDocked(value: boolean) {
    this.isCoursesSidebarDocked.next(value);
  }
}
