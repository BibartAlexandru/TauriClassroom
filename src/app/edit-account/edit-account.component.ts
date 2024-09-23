import { UserTypes } from "./../enums/user-types";
import { Component } from "@angular/core";
import { EditSubjectComponent } from "../edit-subject/edit-subject.component";
import { CommonModule } from "@angular/common";
import { AdminTableComponent } from "../admin-table/admin-table.component";
import { FormsModule } from "@angular/forms";
import { EditItemsComponent } from "../edit-items/edit-items.component";
import { IUser } from "../models/user.model";
import { invoke } from "@tauri-apps/api/core";

@Component({
  selector: "app-edit-account",
  standalone: true,
  imports: [CommonModule, AdminTableComponent, FormsModule],
  templateUrl: "./edit-account.component.html",
  styleUrl: "./edit-account.component.css",
})
export class EditAccountComponent extends EditItemsComponent<IUser> {
  override createSaveItem(item: IUser): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  override editSaveItem(item: IUser): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  override deleteItem(item: IUser): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  override setInputsToSelectedItem(index: number): void {
    throw new Error("Method not implemented.");
  }
  override inputShakeAnimation(): void {
    throw new Error("Method not implemented.");
  }
  override clearAllInputs(): void {
    throw new Error("Method not implemented.");
  }
  override async fetchItems(): Promise<void> {
    let [ok, users] = await invoke<[boolean, IUser[]]>("get_users", {});
    if (!ok) {
      console.log("Failed to fetch users.");
    } else {
      this.items = users;
    }
  }

  userTypesArray: number[] = [];
  UserTypes = UserTypes;
  usertype: number = 0;
  lansat: boolean = false;

  override ngOnInit(): void {
    super.ngOnInit();
    this.userTypesArray = [0, 1, 2];
    this.usertype = 2;
  }
}
