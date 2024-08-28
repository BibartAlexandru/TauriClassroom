import { PostType } from "./../enums/post-types";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { PostTemplateComponent } from "../post-template/post-template.component";
import { PostTemplate } from "../models/post.template";
import { PostsService } from "../services/posts/posts.service";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-notifications",
  standalone: true,
  imports: [CommonModule, PostTemplateComponent, RouterLink],
  templateUrl: "./notifications.component.html",
  styleUrl: "./notifications.component.css",
})
export class NotificationsComponent {
  posts: PostTemplate[] = [];
  PostType = PostType;

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit() {
    this.postsService.getUnseenPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  onNotificationClick(event: boolean, post: PostTemplate) {
    switch (post.type) {
      case PostType.NEWS:
        this.router.navigate(["/", "news"]);
        break;
      default:
        this.router.navigate(["/course", post.course?.id, post.id]);
    }
  }
}
