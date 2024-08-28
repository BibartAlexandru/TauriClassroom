import { Component, EventEmitter, Output } from "@angular/core";
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
  @Output() onOptionsClick: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private coursesService: CoursesService,
    private sharedVariableService: SharedVariablesService
  ) {}

  ngOnInit() {
    this.sharedVariableService.getOpenedCourse().subscribe((course) => {
      this.currentCourse = course;
    });
  }

  clickedOption(opt: string) {
    this.onOptionsClick.emit(opt);
  }
}
