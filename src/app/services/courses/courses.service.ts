import { ICourse } from "../../models/course.model";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor() {}

  courses: ICourse[] = [
    {
      _id: "0",
      subject_id: "0",
      teacher_id: "0",
      class_id: "0",
      time_period: { start: new Date(Date.now()), end: new Date(Date.now()) },
    },
    {
      _id: "1",
      subject_id: "0",
      teacher_id: "0",
      class_id: "0",
      time_period: { start: new Date(Date.now()), end: new Date(Date.now()) },
    },
    {
      _id: "2",
      subject_id: "0",
      teacher_id: "0",
      class_id: "0",
      time_period: { start: new Date(Date.now()), end: new Date(Date.now()) },
    },
    {
      _id: "3",
      subject_id: "0",
      teacher_id: "0",
      class_id: "0",
      time_period: { start: new Date(Date.now()), end: new Date(Date.now()) },
    },
    {
      _id: "4",
      subject_id: "0",
      teacher_id: "0",
      class_id: "0",
      time_period: { start: new Date(Date.now()), end: new Date(Date.now()) },
    },
    {
      _id: "5",
      subject_id: "0",
      teacher_id: "0",
      class_id: "0",
      time_period: { start: new Date(Date.now()), end: new Date(Date.now()) },
    },
    {
      _id: "6",
      subject_id: "0",
      teacher_id: "0",
      class_id: "0",
      time_period: { start: new Date(Date.now()), end: new Date(Date.now()) },
    },
    {
      _id: "7",
      subject_id: "0",
      teacher_id: "0",
      class_id: "0",
      time_period: { start: new Date(Date.now()), end: new Date(Date.now()) },
    },
    {
      _id: "8",
      subject_id: "0",
      teacher_id: "0",
      class_id: "0",
      time_period: { start: new Date(Date.now()), end: new Date(Date.now()) },
    },
    {
      _id: "9",
      subject_id: "0",
      teacher_id: "0",
      class_id: "0",
      time_period: { start: new Date(Date.now()), end: new Date(Date.now()) },
    },
  ];

  getCourses(): Observable<ICourse[]> {
    return of(
      this.courses.sort((c1, c2) => {
        if (c1._id < c2._id) return -1;
        if (c1._id > c2._id) return 1;
        return 0;
      })
    );
  }

  //TODO: This is an example, replace it at some point
  getCourseWithName(name: string): Observable<ICourse> {
    for (let i = 0; i < this.courses.length; i++)
      if (this.courses[i]._id === name) return of(this.courses[i]);
    return of({
      _id: "-1",
      subject_id: "0",
      teacher_id: "0",
      class_id: "0",
      time_period: { start: new Date(Date.now()), end: new Date(Date.now()) },
    });
  }

  getCourseWithId(id: string): Observable<ICourse> {
    for (let i = 0; i < this.courses.length; i++)
      if (this.courses[i]._id === id) return of(this.courses[i]);
    return of({
      _id: "-1",
      subject_id: "0",
      teacher_id: "0",
      class_id: "0",
      time_period: { start: new Date(Date.now()), end: new Date(Date.now()) },
    });
  }
}
