import { Routes } from "@angular/router";
import { CoursePageComponent } from "./course-page/course-page.component";
import { HomeComponent } from "./home/home.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { SearchPageComponent } from "./search-page/search-page.component";
import { ProfileComponent } from "./profile/profile.component";
import { SettingsComponent } from "./settings/settings.component";
import { EditSubjectComponent } from "./edit-subject/edit-subject.component";
import { AdminTableComponent } from "./admin-table/admin-table.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "course/:id",
    component: CoursePageComponent,
  },
  {
    path: "course/:id/:postid",
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
    path: "profile/:id",
    component: ProfileComponent,
  },
  {
    path: "settings",
    component: SettingsComponent,
  },
  {
    path: "create-subject",
    component: EditSubjectComponent,
  },
  {
    path: "edit-subject/:id",
    component: EditSubjectComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
];
