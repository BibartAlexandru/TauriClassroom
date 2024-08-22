import { Injectable } from "@angular/core";
import { ICoursePagePost } from "./models/course-post.model";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursePagePostsService {
  posts: ICoursePagePost[] = [
    {
      id: 0,
      author: "Joe Mama",
      title: "Autism should be illegal",
      text: "This is some post..",
      courseID: 0,
      comments: [],
    },
    {
      id: 1,
      author: "Joe Dad",
      title: "Joe mama",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare turpis neque, eget imperdiet enim mollis sed. Proin semper, ex id luctus rutrum, erat ligula congue est, nec rutrum mauris nibh ac augue. Fusce commodo hendrerit commodo. Suspendisse aliquet, lectus a suscipit dapibus, risus mauris congue odio, a cursus neque ipsum tempus est. Vivamus id sodales diam. Duis sit amet varius metus, vel porta lacus. Proin lectus libero, dictum sed tincidunt et, euismod at nunc. Donec vitae arcu dolor. In at turpis pulvinar orci euismod ultricies sed nec est. Praesent eu rutrum dolor. Aenean sed lectus tincidunt, pharetra nibh at, bibendum velit. Integer venenatis pharetra ex sit amet accumsan. Curabitur aliquet massa arcu, vitae laoreet sapien porttitor sit amet. Ut molestie elementum turpis, vitae cursus augue porta sed. Curabitur blandit finibus pretium. Pellentesque ullamcorper quam justo, a commodo ligula accumsan sed.",
      courseID: 1,
      comments: [],
    },
    {
      id: 2,
      author: "Radu",
      title: "I tripped",
      text: "10 Inspiring Andrew Tate Quotes for Success and Motivation 'Success is not given; it's taken'\n 'Don t let fear hold you back'\n'The key to success is to focus on what you can control and let go of what you can'\n",
      courseID: 0,
      comments: [],
    },
  ];
  constructor() {}

  getPosts(): Observable<ICoursePagePost[]> {
    return of(this.posts);
  }

  getPostsFromCourse(courseID: number): Observable<ICoursePagePost[]> {
    const postsFromCourse = this.posts.filter(
      (post) => post.courseID == courseID
    );
    return of(postsFromCourse);
  }
}
