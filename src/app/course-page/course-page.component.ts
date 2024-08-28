import { PostType } from "./../enums/post-types";
import { CommonModule, NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { ICoursePagePost } from "../models/course-post.model";
import { ICourse } from "../models/course.model";
import { SharedVariablesService } from "../services/shared-variables/shared-variables.service";
import { CourseDetailsComponent } from "../course-details/course-details.component";
import { PostTemplateComponent } from "../post-template/post-template.component";
import { PostsService } from "../services/posts/posts.service";
import { ActivatedRoute } from "@angular/router";
import { CoursesService } from "../services/courses/courses.service";
import { CoursePageStates } from "./course-page.states";
import { UserComponent } from "../user/user.component";
import { IUser } from "../models/user.model";
import { UsersService } from "../services/users/users.service";
@Component({
  selector: "app-course-page",
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    CourseDetailsComponent,
    PostTemplateComponent,
    UserComponent,
  ],
  templateUrl: "./course-page.component.html",
  styleUrl: "./course-page.component.css",
})
export class CoursePageComponent {
  posts: ICoursePagePost[] = [];
  course: ICourse | null = null;
  PostType = PostType;
  dialogState = CoursePageStates.INFO;
  CoursePageStates = CoursePageStates;
  students: IUser[] = [];

  constructor(
    private postsService: PostsService,
    private sharedVariablesService: SharedVariablesService,
    private activatedRoute: ActivatedRoute,
    private courseService: CoursesService,
    private userService: UsersService
  ) {}

  getCurrentDate(): string {
    const currentDate = new Date(Date.now());
    return `${currentDate.getDay()}.${currentDate.getMonth()}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const courseID: number = Number(params.get("id"));
      if (isNaN(courseID)) {
        console.error(
          `Expected id parameter to be a number on route courses/:id. Actual value: ${params.get(
            "id"
          )}`
        );
        return;
      }
      this.courseService.getCourseWithId(courseID).subscribe((course) => {
        if (course == null) return;
        this.sharedVariablesService.setOpenedCourse(course);
        //console.log(course);
        this.course = course;
        this.fetchInfo();
      });
    });
  }

  fetchInfo() {
    if (this.course === null) return;
    this.postsService.getPostsFromCourse(this.course.id).subscribe((posts) => {
      this.posts = posts;
    });
  }

  fetchMaterials() {
    if (this.course === null) return;
    this.postsService.getCourseInfoPosts(this.course.id).subscribe((posts) => {
      this.posts = posts as ICoursePagePost[];
    });
  }

  fetchPeople() {
    this.userService.getUsers().subscribe((users) => {
      this.students = users;
    });
  }

  onOptionsClick(option: string) {
    // console.log(option);
    switch (option) {
      case "Info":
        this.dialogState = CoursePageStates.INFO;
        this.fetchInfo();
        break;
      case "Materials":
        this.dialogState = CoursePageStates.MATERIALS;
        this.fetchMaterials();
        break;
      case "People":
        this.dialogState = CoursePageStates.PEOPLE;
        this.fetchPeople();
        break;
      default:
        console.error(
          `CoursePageComponent expected options Posts,Materials and People, received:${option}`
        );
        break;
    }
  }
}
