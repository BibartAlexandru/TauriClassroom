import { CoursePagePostsService } from "./../services/course-page-posts.service";
import { CommonModule, NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { ICoursePagePost } from "../models/course-post.model";
import { ICourse } from "../models/course.model";
import { SharedVariablesService } from "../services/shared-variables.service";
@Component({
  selector: "app-course-page",
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: "./course-page.component.html",
  styleUrl: "./course-page.component.css",
})
export class CoursePageComponent {
  posts: ICoursePagePost[] = [];
  course: ICourse | null = null;

  constructor(
    private coursePagePostsService: CoursePagePostsService,
    private sharedVariablesService: SharedVariablesService
  ) {}

  getCurrentDate(): string {
    const currentDate = new Date(Date.now());
    return `${currentDate.getDay()}.${currentDate.getMonth()}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
  }

  ngOnInit() {
    this.sharedVariablesService.getOpenedCourse().subscribe((course) => {
      if (course == null) return;
      console.log(course);
      this.coursePagePostsService
        .getPostsFromCourse(course.id)
        .subscribe((posts) => {
          this.posts = posts;
        });
    });
  }
}
