import { Injectable } from "@angular/core";
import { EMPTY, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor() {}

  courses: string[] = [
    "Maths",
    "Physics",
    "English",
    "Juggling",
    "Biology",
    "Astronomy",
    "Programming1",
    "Programming2",
    "Psychology",
    "Literature",
    "Help",
  ];

  getCourses(): Observable<string[]> {
    return of(this.courses);
  }

  //TODO: This is an example, replace it at some point
  getCourseWithName(name: string): Observable<string> {
    for (let i = 0; i < this.courses.length; i++)
      if (this.courses[i] === name) return of(this.courses[i]);
    return of("");
  }
}
