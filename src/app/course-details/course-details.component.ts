import { Component } from "@angular/core";
import { ICourse } from "../models/course.model";
import { CoursesService } from "../services/courses/courses.service";
import { SharedVariablesService } from "../services/shared-variables/shared-variables.service";

@Component({
  selector: "app-course-details",
  standalone: true,
  imports: [],
  templateUrl: "./course-details.component.html",
  styleUrl: "./course-details.component.css",
})
export class CourseDetailsComponent {
  currentCourse: ICourse | null = null;
  constructor(
    private coursesService: CoursesService,
    private sharedVariableService: SharedVariablesService
  ) {}

  ngOnInit() {
    this.sharedVariableService.getOpenedCourse().subscribe((course) => {
      this.currentCourse = course;
    });
  }
}
