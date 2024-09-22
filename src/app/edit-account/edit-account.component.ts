import { UserTypes } from "./../enums/user-types";
import { Component } from "@angular/core";
import { EditSubjectComponent } from "../edit-subject/edit-subject.component";
import { CommonModule } from "@angular/common";
import { AdminTableComponent } from "../admin-table/admin-table.component";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-edit-account",
  standalone: true,
  imports: [CommonModule, AdminTableComponent, FormsModule],
  templateUrl: "./edit-account.component.html",
  styleUrl: "./edit-account.component.css",
})
export class EditAccountComponent extends EditSubjectComponent {
  UserTypes = [
    UserTypes[UserTypes.ADMIN],
    UserTypes[UserTypes.STUDENT],
    UserTypes[UserTypes.TEACHER],
  ];
  usertype: UserTypes = UserTypes.TEACHER;
}
