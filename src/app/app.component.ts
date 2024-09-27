import { SharedVariablesService } from "./services/shared-variables/shared-variables.service";
import { Component, OnInit } from "@angular/core";
import { CommonModule, NgIf } from "@angular/common";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { invoke } from "@tauri-apps/api/core";
import { NavbarComponent } from "./navbar/navbar.component";
import { TestComponent } from "./test/test.component";
import { CoursesSidebarComponent } from "./courses-sidebar/courses-sidebar.component";
import { CourseDetailsComponent } from "./course-details/course-details.component";
import { ICourse } from "./models/course.model";
import { filter } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    TestComponent,
    CoursesSidebarComponent,
    CourseDetailsComponent,
    NgIf,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  greetingMessage = "";
  selectedCourse: ICourse | null = null;
  routerOutlerRoute: string = "";

  constructor(
    private sharedVariablesService: SharedVariablesService,
    private router: Router
  ) {}

  greet(event: SubmitEvent, name: string): void {
    event.preventDefault();

    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    invoke<string>("greet", { name }).then((text) => {
      this.greetingMessage = text;
    });
  }

  containsCourseSidebar(): boolean {
    return (
      this.routerOutlerRoute === "/" ||
      (this.routerOutlerRoute.includes("course") &&
        this.routerOutlerRoute !== "/create-course")
    );
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((navEvent) => {
        this.routerOutlerRoute = this.router.url;
      });
    this.sharedVariablesService.getOpenedCourse().subscribe((course) => {
      this.selectedCourse = course;
    });
  }
}
