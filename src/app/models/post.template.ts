import { CommentTemplate } from "./comment.template";

export type PostTemplate = {
  author: string;
  title: string;
  text: string;
  date: string;
  comments?: CommentTemplate[];
  [key: string]: any;
};
