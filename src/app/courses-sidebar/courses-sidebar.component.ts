import { CommonModule, NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { ICourse } from "../models/course.model";
import { SharedVariablesService } from "../services/shared-variables.service";
import { CoursesService } from "../services/courses.service";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-courses-sidebar",
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, RouterLink],
  templateUrl: "./courses-sidebar.component.html",
  styleUrl: "./courses-sidebar.component.css",
})
export class CoursesSidebarComponent {
  courses: ICourse[] = [];
  openedCourse: ICourse | null = null;
  isDocked: boolean = false;

  constructor(
    private sharedVariablesService: SharedVariablesService,
    private coursesService: CoursesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sharedVariablesService.getOpenedCourse().subscribe((course) => {
      this.openedCourse = course;
    });
    this.sharedVariablesService
      .getIsCoursesSidebarDocked()
      .subscribe((isDocked) => {
        this.isDocked = isDocked;
        console.log(isDocked);
      });
    this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  onCourseIconClick(index: number) {
    const chosenCourse = this.courses[index];
    this.courses = [
      chosenCourse,
      ...this.courses.filter((courseName) => courseName !== chosenCourse),
    ];
    this.sharedVariablesService.setOpenedCourse(chosenCourse);
    this.sharedVariablesService.setIsCoursesSidebarDocked(true);
    // this.router.navigate(["/course"]);
  }

  getRandomColorStyle() {
    const randomHueShift = Math.floor(Math.random() * 360);
    return {
      filter: `hue-rotate(${randomHueShift.toString()}deg)`,
    };
  }

  dockSelf() {
    this.sharedVariablesService.setIsCoursesSidebarDocked(!this.isDocked);
  }
}
