import { PostTemplate } from "./../models/post.template";
import { ICourse } from "./../models/course.model";
import { PostType } from "./../enums/post-types";
import { Component } from "@angular/core";
import { HomeComponentStates } from "./home.component.state.model";
import { CommonModule, NgIf } from "@angular/common";
import { PostTemplateComponent } from "../post-template/post-template.component";
import DateFormatter from "../date-formatting";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, NgIf, PostTemplateComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  state: HomeComponentStates = HomeComponentStates.TO_DO;
  HomeComponentStates = HomeComponentStates;
  PostType = PostType;
  posts: PostTemplate[] = [];
  currentDate = new Date(Date.now());
  post_for_testing: PostTemplate = {
    author: "ME",
    date: DateFormatter.formatDate(this.currentDate),
    title: "wassup",
    text: "EYEEEE",
    type: PostType.HOMEWORK,
    course: {
      name: "Tras cu pusca",
      id: 99,
    },
  };

  news: PostTemplate = {
    author: "ADMIN",
    date: DateFormatter.formatDate(this.currentDate),
    title: "Artist nou",
    text: "Bvcovia s-a lansat in industrie!",
    type: PostType.NEWS,
  };

  onStateClick(newState: HomeComponentStates) {
    this.state = newState;
    switch (this.state) {
      case HomeComponentStates.NEWS:
        this.loadNews();
        break;
      case HomeComponentStates.TO_DO:
        this.loadToDos();
        break;
    }
  }

  loadToDos() {
    this.posts = [this.post_for_testing, this.post_for_testing];
  }

  loadNews() {
    this.posts = [this.news];
  }

  ngOnInit() {
    this.loadToDos();
  }
}
