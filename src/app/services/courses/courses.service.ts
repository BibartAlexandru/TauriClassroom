import { ICourse } from "../../models/course.model";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor() {}

  courses: ICourse[] = [
    { name: "Maths", id: 0 },
    { name: "Physics", id: 1 },
    { name: "English", id: 2 },
    { name: "Juggling", id: 3 },
    { name: "Biology", id: 4 },
    { name: "Astronomy", id: 5 },
    { name: "Programming1", id: 6 },
    { name: "Programming2", id: 7 },
    { name: "Psychology", id: 8 },
    { name: "Literature", id: 9 },
    { name: "Help", id: 10 },
  ];

  getCourses(): Observable<ICourse[]> {
    return of(this.courses);
  }

  //TODO: This is an example, replace it at some point
  getCourseWithName(name: string): Observable<ICourse> {
    for (let i = 0; i < this.courses.length; i++)
      if (this.courses[i].name === name) return of(this.courses[i]);
    return of({ name: "NOT_FOUND", id: -1 });
  }

  getCourseWithId(id: number): Observable<ICourse> {
    for (let i = 0; i < this.courses.length; i++)
      if (this.courses[i].id === id) return of(this.courses[i]);
    return of({ name: "NOT_FOUND", id: -1 });
  }
}
