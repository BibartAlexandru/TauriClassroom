import { IComment } from "./comment.model";

export interface ICoursePagePost {
  author: string;
  title: string;
  text: string;
  date: string;
  id: number;
  courseID: number;
  comments: IComment[];
}
