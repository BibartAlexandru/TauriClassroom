import { UserTypes } from "./../enums/user-types";
import { Component } from "@angular/core";
import { EditSubjectComponent } from "../edit-subject/edit-subject.component";
import { CommonModule } from "@angular/common";
import { AdminTableComponent } from "../admin-table/admin-table.component";
import { FormsModule } from "@angular/forms";
import { EditItemsComponent } from "../edit-items/edit-items.component";
import { IUser } from "../models/user.model";
import { invoke } from "@tauri-apps/api/core";

export const DEFAULT_PROFILE_PICTURE_FILE_OBJECT_ID =
  "66f18abe075b71d6d3b11943";
@Component({
  selector: "app-edit-account",
  standalone: true,
  imports: [CommonModule, AdminTableComponent, FormsModule],
  templateUrl: "./edit-account.component.html",
  styleUrl: "./edit-account.component.css",
})
export class EditAccountComponent extends EditItemsComponent<IUser> {
  override async createSaveItem(item: IUser): Promise<boolean> {
    if (
      item.email.length === 0 ||
      item.name.length === 0 ||
      item.password.length === 0
    ) {
      this.inputShakeAnimation();
      return Promise.resolve(false);
    }
    let [ok, createdObjId] = await invoke<[boolean, string]>("create_user", {
      user: item,
    });
    if (ok) {
      this.items.push({ ...item, _id: createdObjId });
      return Promise.resolve(true);
    }
    console.error("Failed to create user.");
    return Promise.resolve(false);
  }
  override async editSaveItem(item: IUser, index: number): Promise<boolean> {
    if (
      item.email.length === 0 ||
      item.name.length === 0 ||
      item.password.length === 0
    ) {
      this.inputShakeAnimation();
      return Promise.resolve(false);
    }
    let ok = await invoke<boolean>("edit_user", { user: item });
    if (ok) {
      this.items[index] = item;
    }
    console.error("Failed to edit user.");
    return Promise.resolve(false);
  }
  override async deleteItem(item: IUser): Promise<boolean> {
    let ok = await invoke<boolean>("delete_user", { objId: item._id });
    if (ok) {
      return Promise.resolve(true);
    }
    console.error(`Failed to delete item: ${item}`);
    return Promise.resolve(false);
  }
  override setInputsToSelectedItem(index: number): void {
    this.item.name = this.items[index].name;
    this.item.password = this.items[index].password;
    this.item.email = this.items[index].email;
    this.item._type = this.items[index]._type;
    this.item.lansat = this.items[index].lansat;
  }

  override inputShakeAnimation(): void {
    let emptyInputs: HTMLElement[] = [];
    {
      let input = document.getElementById("name-input") as HTMLInputElement;
      if (input.value.length === 0) emptyInputs.push(input);
    }
    {
      let input = document.getElementById("password-input") as HTMLInputElement;
      if (input.value.length === 0) emptyInputs.push(input);
    }
    {
      let input = document.getElementById("email-input") as HTMLInputElement;
      if (input.value.length === 0) emptyInputs.push(input);
    }
    for (let inp of emptyInputs) {
      inp.classList.add("empty-input-anim");
      setTimeout(() => {
        inp.classList.remove("empty-input-anim");
      }, 1000);
    }
  }
  override clearAllInputs(): void {
    this.item.email = "";
    this.item.name = "";
    this.item.password = "";
  }
  override async fetchItems(): Promise<void> {
    let [ok, users] = await invoke<[boolean, IUser[]]>("get_users", {});
    if (!ok) {
      console.log("Failed to fetch users.");
    } else {
      this.items = users;
      console.log(this.items);
    }
  }

  userTypesArray: string[] = [];
  UserTypes = UserTypes;
  defaultImageObjectId = "";

  override ngOnInit(): void {
    super.ngOnInit();
    this.userTypesArray = [
      UserTypes[UserTypes.ADMIN],
      UserTypes[UserTypes.STUDENT],
      UserTypes[UserTypes.TEACHER],
    ];
    this.item = {
      _id: "",
      _type: UserTypes[UserTypes.TEACHER],
      name: "",
      email: "",
      password: "",
      lansat: true,
      img_id: DEFAULT_PROFILE_PICTURE_FILE_OBJECT_ID,
    } as IUser;
  }
}
