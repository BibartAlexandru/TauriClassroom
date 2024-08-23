import { SharedVariablesService } from "./services/shared-variables.service";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { invoke } from "@tauri-apps/api/core";
import { NavbarComponent } from "./navbar/navbar.component";
import { TestComponent } from "./test/test.component";
import { CoursesSidebarComponent } from "./courses-sidebar/courses-sidebar.component";
import { CourseDetailsComponent } from "./course-details/course-details.component";
import { ICourse } from "./models/course.model";

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
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  greetingMessage = "";
  selectedCourse: ICourse | null = null;

  constructor(private sharedVariablesService: SharedVariablesService) {}

  greet(event: SubmitEvent, name: string): void {
    event.preventDefault();

    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    invoke<string>("greet", { name }).then((text) => {
      this.greetingMessage = text;
    });
  }

  ngOnInit() {
    this.sharedVariablesService.getOpenedCourse().subscribe((course) => {
      this.selectedCourse = course;
    });
  }
}
