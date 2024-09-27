import { UserTypes } from "../enums/user-types";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  user_type: string;
  img_id: string;
  lansat: boolean;
}
