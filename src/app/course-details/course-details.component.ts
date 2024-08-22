import { Component } from "@angular/core";
import { CoursesService } from "../courses.service";
import { SharedVariablesService } from "../shared-variables.service";
import { ICourse } from "../models/course.model";

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
