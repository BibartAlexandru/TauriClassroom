import { Routes } from "@angular/router";
import { TestComponent } from "./test/test.component";
import { CoursePageComponent } from "./course-page/course-page.component";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "course",
    component: CoursePageComponent,
  },
];
