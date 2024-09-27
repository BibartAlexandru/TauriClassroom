import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import DateFormatter from "../../date-formatting";
import { PostType } from "../../enums/post-types";
import { ICoursePagePost } from "../../models/course-post.model";
import { ICourse } from "../../models/course.model";
import { PostTemplate } from "../../models/post.template";
import { ISubject } from "../../models/subject.model";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  currentDate = new Date(Date.now());
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
  posts: ICoursePagePost[] = [
    {
      id: 0,
      author: "Joe Mama",
      title: "Biology should be illegal",
      text: "This is some post..",
      course: this.courses[0],
      date: DateFormatter.formatDate(new Date()),
      type: PostType.INFO,
      comments: [
        {
          author: "mama ta",
          text: "Acesta este un comentariu foarte lung pe care l-am scris doar ca sa vedem cum se vor afisa comentarile lungi.",
          date: DateFormatter.formatDate(new Date()),
        },
        { author: "tatal tau", text: "CEAU!", date: "" },
        {
          author: "bunica",
          text: "BAAA!",
          date: DateFormatter.formatDate(new Date()),
        },
      ],
    },
    {
      id: 1,
      type: PostType.INFO,
      date: DateFormatter.formatDate(new Date()),
      author: "Joe Dad",
      title: "Joe mama",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare turpis neque, eget imperdiet enim mollis sed. Proin semper, ex_id luctus rutrum, erat ligula congue est, nec rutrum mauris nibh ac augue. Fusce commodo hendrerit commodo. Suspendisse aliquet, lectus a suscipit dapibus, risus mauris congue odio, a cursus neque ipsum tempus est. Vivamus_id sodales diam. Duis sit amet varius metus, vel porta lacus. Proin lectus libero, dictum sed tincidunt et, euismod at nunc. Donec vitae arcu dolor. In at turpis pulvinar orci euismod ultricies sed nec est. Praesent eu rutrum dolor. Aenean sed lectus tincidunt, pharetra nibh at, bibendum velit. Integer venenatis pharetra ex sit amet accumsan. Curabitur aliquet massa arcu, vitae laoreet sapien porttitor sit amet. Ut molestie elementum turpis, vitae cursus augue porta sed. Curabitur blandit finibus pretium. Pellentesque ullamcorper quam justo, a commodo ligula accumsan sed.",
      course: this.courses[1],
      comments: [],
    },
    {
      id: 2,
      type: PostType.INFO,
      date: DateFormatter.formatDate(new Date()),
      author: "Radu",
      title: "I tripped",
      text: "10 Inspiring Andrew Tate Quotes for Success and Motivation 'Success is not given; it's taken'\n 'Don t let fear hold you back'\n'The key to success is to focus on what you can control and let go of what you can'\n",
      course: this.courses[0],
      comments: [],
    },
  ];
  post_for_testing: PostTemplate = {
    id: 1,
    author: "ME",
    date: DateFormatter.formatDate(this.currentDate),
    title: "wassup",
    text: "EYEEEE",
    type: PostType.HOMEWORK,
    course: this.courses[3],
  };

  post_for_testing2: PostTemplate = {
    id: 2,
    author: "Joe",
    date: DateFormatter.formatDate(this.currentDate),
    title: "TEST FULGER!",
    text: "Aveti 10 minute sa-mi citati toate melodiile lui Bvcovia! Cine copiaza primeste 10!",
    type: PostType.TEST,
    course: this.courses[0],
  };

  newsPost: PostTemplate = {
    id: 2,
    author: "ADMIN",
    date: DateFormatter.formatDate(this.currentDate),
    title: "Artist nou",
    text: "Bvcovia s-a lansat in industrie!",
    type: PostType.NEWS,
  };

  materialPost: PostTemplate = {
    id: 3,
    author: "ADMIN",
    date: DateFormatter.formatDate(this.currentDate),
    title: "Ecuatii de gradul 3",
    text: "V-am atasat lectia. Saptamana viitoare dati test.",
    type: PostType.MATERIAL,
    course: this.courses[3],
    comments: [],
  };
  constructor() {}

  getPosts(): Observable<ICoursePagePost[]> {
    return of(this.posts);
  }

  getPostsFromCourse(courseID: string): Observable<ICoursePagePost[]> {
    const postsFromCourse = this.posts.filter(
      (post) => post.course._id == courseID
    );
    return of([...postsFromCourse]);
  }

  getToDoPosts(): Observable<PostTemplate[]> {
    return of([this.post_for_testing, this.post_for_testing2]);
  }

  getNewsPosts(): Observable<PostTemplate[]> {
    return of([this.newsPost]);
  }

  getUnseenPosts(): Observable<PostTemplate[]> {
    return of([
      this.newsPost,
      this.post_for_testing,
      this.post_for_testing2,
      this.materialPost,
    ]);
  }

  getCourseInfoPosts(courseID: string): Observable<PostTemplate[]> {
    //TODO: Call Rust function
    return of([this.materialPost]);
  }
}
