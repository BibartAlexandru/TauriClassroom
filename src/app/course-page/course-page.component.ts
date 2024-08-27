import { PostType } from "./../enums/post-types";
import { CommonModule, NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { ICoursePagePost } from "../models/course-post.model";
import { ICourse } from "../models/course.model";
import { SharedVariablesService } from "../services/shared-variables/shared-variables.service";
import { CourseDetailsComponent } from "../course-details/course-details.component";
import { PostTemplateComponent } from "../post-template/post-template.component";
import { PostsService } from "../services/posts/posts.service";
@Component({
  selector: "app-course-page",
  standalone: true,
  imports: [CommonModule, NgFor, CourseDetailsComponent, PostTemplateComponent],
  templateUrl: "./course-page.component.html",
  styleUrl: "./course-page.component.css",
})
export class CoursePageComponent {
  posts: ICoursePagePost[] = [];
  course: ICourse | null = null;
  PostType = PostType;

  constructor(
    private postsService: PostsService,
    private sharedVariablesService: SharedVariablesService
  ) {}

  getCurrentDate(): string {
    const currentDate = new Date(Date.now());
    return `${currentDate.getDay()}.${currentDate.getMonth()}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
  }

  ngOnInit() {
    this.sharedVariablesService.getOpenedCourse().subscribe((course) => {
      if (course == null) return;
      //console.log(course);
      this.course = course;
      this.postsService.getPostsFromCourse(course.id).subscribe((posts) => {
        this.posts = posts;
      });
    });
  }
}
