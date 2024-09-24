import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IUser } from "../../models/user.model";
import { UserTypes } from "../../enums/user-types";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor() {}
  users: IUser[] = [
    {
      name: "Joe",
      _id: "0",
      img_id: "assets/default_profile.jpg",
      email: "",
      password: "",
      _type: UserTypes[UserTypes.TEACHER],
      lansat: false,
    },
    {
      name: "BBtei",
      _id: "1",
      img_id: "assets/default_profile.jpg",
      email: "",
      password: "",
      _type: UserTypes[UserTypes.TEACHER],
      lansat: false,
    },
    {
      name: "SICarpPhishing 🐟",
      _id: "2",
      img_id: "assets/default_profile.jpg",
      email: "",
      password: "",
      _type: UserTypes[UserTypes.TEACHER],
      lansat: false,
    },
  ];

  getUsers(): Observable<IUser[]> {
    return of(this.users);
  }
}
