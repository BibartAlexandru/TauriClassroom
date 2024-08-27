import { PostTemplate } from "./../models/post.template";
import { ICourse } from "./../models/course.model";
import { PostType } from "./../enums/post-types";
import { Component } from "@angular/core";
import { HomeComponentStates } from "./home.component.state.model";
import { CommonModule, NgIf } from "@angular/common";
import { PostTemplateComponent } from "../post-template/post-template.component";
import DateFormatter from "../date-formatting";
import { PostsService } from "../services/posts/posts.service";

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

  constructor(private postService: PostsService) {}

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
    this.postService.getToDoPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  loadNews() {
    this.postService.getNewsPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnInit() {
    this.loadToDos();
  }
}
