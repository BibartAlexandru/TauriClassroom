import { CommonModule, NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { SharedVariablesService } from "../shared-variables.service";
import { CoursesService } from "../courses.service";

@Component({
  selector: "app-courses-sidebar",
  standalone: true,
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: "./courses-sidebar.component.html",
  styleUrl: "./courses-sidebar.component.css",
})
export class CoursesSidebarComponent {
  courses: string[] = [];
  openedCourseIndex: number = -1;
  isDocked: boolean = false;

  constructor(
    private sharedVariablesService: SharedVariablesService,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.sharedVariablesService.getOpenedCourseIndex().subscribe((index) => {
      this.openedCourseIndex = index;
      console.log(index);
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
    this.sharedVariablesService.setOpenedCourseIndex(0);
    this.sharedVariablesService.setIsCoursesSidebarDocked(true);
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
