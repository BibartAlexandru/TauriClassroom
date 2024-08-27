import { PostType } from "./../enums/post-types";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { PostTemplateComponent } from "../post-template/post-template.component";
import { PostTemplate } from "../models/post.template";
import { PostsService } from "../services/posts/posts.service";

@Component({
  selector: "app-notifications",
  standalone: true,
  imports: [CommonModule, PostTemplateComponent],
  templateUrl: "./notifications.component.html",
  styleUrl: "./notifications.component.css",
})
export class NotificationsComponent {
  posts: PostTemplate[] = [];
  PostType = PostType;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getUnseenPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
