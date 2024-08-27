import { Routes } from "@angular/router";
import { CoursePageComponent } from "./course-page/course-page.component";
import { HomeComponent } from "./home/home.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { SearchPageComponent } from "./search-page/search-page.component";
import { ProfileComponent } from "./profile/profile.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "course",
    component: CoursePageComponent,
  },
  {
    path: "notifications",
    component: NotificationsComponent,
  },
  {
    path: "search",
    component: SearchPageComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
];
