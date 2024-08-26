import { PostType } from "../enums/post-types";
import { CommentTemplate } from "./comment.template";
import { ICourse } from "./course.model";

export type PostTemplate = {
  author: string;
  title: string;
  text: string;
  type: PostType;
  date: string;
  comments?: CommentTemplate[];
  course?: ICourse;
  [key: string]: any;
};
