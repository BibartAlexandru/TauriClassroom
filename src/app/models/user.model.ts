import { UserTypes } from "../enums/user-types";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  _type: string;
  img_id: string;
  lansat: boolean;
}
