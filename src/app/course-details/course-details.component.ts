import { CoursePageStates } from "./../course-page/course-page.states";
import { Component, EventEmitter, Output } from "@angular/core";
import { ICourse } from "../models/course.model";
import { CoursesService } from "../services/courses/courses.service";
import { SharedVariablesService } from "../services/shared-variables/shared-variables.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-course-details",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./course-details.component.html",
  styleUrl: "./course-details.component.css",
})
export class CourseDetailsComponent {
  currentCourse: ICourse | null = null;
  dialogState: CoursePageStates = CoursePageStates.INFO;
  CoursePageStates = CoursePageStates;
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
    switch (opt) {
      case "Info":
        this.dialogState = CoursePageStates.INFO;
        break;
      case "Materials":
        this.dialogState = CoursePageStates.MATERIALS;
        break;
      case "People":
        this.dialogState = CoursePageStates.PEOPLE;
        break;
      default:
        console.error(
          `CourseDetailsComponent emitted ${opt}. Expected 'Info'/'People'/'Materials'`
        );
        break;
    }
    this.onOptionsClick.emit(opt);
  }

  getOptionsClass(opt: CoursePageStates): string {
    if (opt === this.dialogState) return "selected-option";
    return "";
  }
}
