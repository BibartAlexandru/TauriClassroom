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
      id: 0,
      imageSrc: "assets/default_profile.jpg",
    },
    {
      name: "BBtei",
      id: 1,
      imageSrc: "assets/default_profile.jpg",
    },
    {
      name: "SICarpPhishing 🐟",
      id: 2,
      imageSrc: "assets/default_profile.jpg",
    },
  ];

  getUsers(): Observable<IUser[]> {
    return of(this.users);
  }
}
