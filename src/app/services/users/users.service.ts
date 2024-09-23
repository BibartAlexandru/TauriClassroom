import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IUser } from "../../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor() {}
  users: IUser[] = [
    {
      name: "Joe",
      _id: "0",
      imageSrc: "assets/default_profile.jpg",
    },
    {
      name: "BBtei",
      _id: "1",
      imageSrc: "assets/default_profile.jpg",
    },
    {
      name: "SICarpPhishing 🐟",
      _id: "2",
      imageSrc: "assets/default_profile.jpg",
    },
  ];

  getUsers(): Observable<IUser[]> {
    return of(this.users);
  }
}
