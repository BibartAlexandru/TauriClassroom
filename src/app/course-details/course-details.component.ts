import { Component } from "@angular/core";
import { CoursesService } from "../courses.service";
import { SharedVariablesService } from "../shared-variables.service";

@Component({
  selector: "app-course-details",
  standalone: true,
  imports: [],
  templateUrl: "./course-details.component.html",
  styleUrl: "./course-details.component.css",
})
export class CourseDetailsComponent {
  currentCourse: string = "NOTHING";
  constructor(
    private coursesService: CoursesService,
    private sharedVariableService: SharedVariablesService
  ) {}

  ngOnInit() {}
}
