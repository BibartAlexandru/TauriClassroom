import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedVariablesService {
  openedCourseIndex: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  isCoursesSidebarDocked: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor() {}

  getOpenedCourseIndex(): Observable<number> {
    return this.openedCourseIndex.asObservable();
  }

  setOpenedCourseIndex(value: number) {
    this.openedCourseIndex.next(value);
  }

  getIsCoursesSidebarDocked(): Observable<boolean> {
    return this.isCoursesSidebarDocked.asObservable();
  }

  setIsCoursesSidebarDocked(value: boolean) {
    this.isCoursesSidebarDocked.next(value);
  }
}
