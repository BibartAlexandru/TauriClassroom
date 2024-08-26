import { PostType } from "../enums/post-types";
import { IComment } from "./comment.model";
import { ICourse } from "./course.model";

export interface ICoursePagePost {
  author: string;
  title: string;
  text: string;
  date: string;
  id: number;
  course: ICourse;
  comments: IComment[];
  type: PostType;
}
