import { CommonModule, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommentTemplate } from "../models/comment.template";
import { PostTemplate } from "../models/post.template";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-post-template",
  standalone: true,
  imports: [NgIf, CommonModule, FormsModule],
  templateUrl: "./post-template.component.html",
  styleUrl: "./post-template.component.css",
})
export class PostTemplateComponent {
  @Input({ required: true }) post: PostTemplate = {
    author: "MISSING",
    title: "MISSING",
    date: "MISSING",
    text: "MISSING",
    comments: [
      {
        author: "MISSING",
        text: "MISSING",
        date: "MISSING",
      },
      {
        author: "MISSING",
        text: "MISSING",
        date: "MISSING",
      },
    ],
  };
  @Input({ required: true }) hasComments: boolean = false;
  @Input({ required: true }) nrInitialCommentsShown: number = 0;
  @Output() submittedComment: EventEmitter<string> = new EventEmitter<string>();

  nrShownComments: number = 0;
  newComment: string = "";

  inputErrorCheck() {
    if (this.hasComments === true && this.post.comments === undefined)
      throw new Error(
        `Inside the post-template component, hasComments is set to true, but the post object does not have a property named 'comments'.`
      );
    else if (this.hasComments === false && this.post.comments !== undefined)
      throw new Error(
        `Inside the post-template component, hasComments is set to false, but the post object does have a property named 'comments'.`
      );
  }

  toggleCommentsExpand() {
    if (this.post.comments === undefined) return;
    if (this.nrShownComments === this.nrInitialCommentsShown)
      this.nrShownComments = this.post.comments?.length;
    else this.nrShownComments = this.nrInitialCommentsShown;
    console.log(this.nrShownComments);
  }

  onCommentSubmit() {
    this.submittedComment.emit(this.newComment);
    console.log(this.newComment);
    this.newComment = "";
  }

  ngOnInit() {
    this.inputErrorCheck();
    this.nrShownComments = this.nrInitialCommentsShown;
  }
}
