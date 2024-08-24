import { Component } from "@angular/core";
import { HomeComponentStates } from "./home.component.state.model";
import { CommonModule, NgIf } from "@angular/common";
import { PostTemplateComponent } from "../post-template/post-template.component";

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

  post_for_testing = {
    author: "ME",
    date: new Date(Date.now()).toString(),
    title: "wassup",
    text: "EYEEEE",
  };

  onStateClick(newState: HomeComponentStates) {
    this.state = newState;
  }
}
