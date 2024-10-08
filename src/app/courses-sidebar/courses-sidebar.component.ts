import { CommonModule, NgFor, NgIf } from "@angular/common";
import { ChangeDetectorRef, Component, ElementRef } from "@angular/core";
import { ICourse } from "../models/course.model";
import { SharedVariablesService } from "../services/shared-variables/shared-variables.service";
import { CoursesService } from "../services/courses/courses.service";
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
  isDocked: boolean = true;

  constructor(
    private sharedVariablesService: SharedVariablesService,
    private coursesService: CoursesService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    document.addEventListener(
      "click",
      this.onOutsideSideBarClick.bind(this, this.elementRef)
    );

    this.sharedVariablesService
      .getIsCoursesSidebarDocked()
      .subscribe((isDocked) => {
        this.isDocked = isDocked;
        //console.log(isDocked);
      });
    this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
    this.sharedVariablesService.getOpenedCourse().subscribe((course) => {
      this.openedCourse = course;
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy() {
    document.removeEventListener(
      "click",
      this.onOutsideSideBarClick.bind(this, this.elementRef)
    );
  }

  onOutsideSideBarClick(elementRef: ElementRef, event: Event) {
    const thisElement = this.elementRef.nativeElement;
    if (event.target === null) return;
    const clickedElement: HTMLElement = event.target as HTMLElement;
    if (
      thisElement.contains(clickedElement) ||
      clickedElement === thisElement
    ) {
      //console.log("ClICKED INSIDE");
    } else {
      //console.log("outside");
      if (this.isDocked === false) this.dockSelf(event);
    }
  }

  onCourseIconClick(index: number) {
    const chosenCourse = this.courses[index];
    // this.courses = [
    //   chosenCourse,
    //   ...this.courses.filter((courseName) => courseName !== chosenCourse),
    // ];
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

  dockSelf(event: Event) {
    event.stopPropagation();
    this.sharedVariablesService.setIsCoursesSidebarDocked(!this.isDocked);
  }
}
