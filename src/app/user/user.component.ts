import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { IUser } from "../models/user.model";

@Component({
  selector: "app-user",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.css",
})
export class UserComponent {
  @Input({ required: true }) user: IUser = {
    name: "Missing",
    _id: "-1",
    imageSrc: "",
  };
}
