import { CommonModule, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { CommentTemplate } from "../models/comment.template";
import { PostTemplate } from "../models/post.template";

@Component({
  selector: "app-post-template",
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: "./post-template.component.html",
  styleUrl: "./post-template.component.css",
})
export class PostTemplateComponent {
  @Input() post: PostTemplate = {
    author: "MISSING",
    title: "MISSING",
    date: "MISSING",
    text: "MISSING",
  };
  @Input() comments: CommentTemplate[] = [
    {
      author: "MISSING",
      text: "MISSING",
      date: "MISSING",
    },
  ];
}
