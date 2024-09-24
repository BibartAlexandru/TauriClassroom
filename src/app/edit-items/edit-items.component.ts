import { ISubject } from "./../models/subject.model";
import { Component } from "@angular/core";
import { EditComponentStates } from "../enums/edit-component-states";
import { ActivatedRoute } from "@angular/router";
import { invoke } from "@tauri-apps/api/core";
import { SubjectsService } from "../services/subjects/subjects.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AdminTableComponent } from "../admin-table/admin-table.component";

@Component({
  selector: "app-edit-items",
  standalone: true,
  imports: [CommonModule, FormsModule, AdminTableComponent],
  templateUrl: "./edit-items.component.html",
  styleUrl: "./edit-items.component.css",
})
export abstract class EditItemsComponent<
  T extends { [key: string]: any; _id: string }
> {
  EditComponentStates = EditComponentStates;
  dialogState = EditComponentStates.WAITING;
  popupVisible = false;
  popupText: string = "";
  item = {
    _id: "",
    name: "",
  } as unknown as T;
  items: T[] = [];
  selectedItemIndex: number | null = null;
  itemToDeleteIndex: number | null = null;

  ngOnInit() {
    this.fetchItems().then(() => {
      this.dialogState = EditComponentStates.CREATE;
    });
  }

  selectItem(index: number | null) {
    console.log(`selected : ${index}`);
    if (index === null) return;
    this.dialogState = EditComponentStates.EDIT;
    this.selectedItemIndex = index;
    this.setInputsToSelectedItem(index);
  }

  onPlusClick() {
    this.selectedItemIndex = null;
    this.dialogState = EditComponentStates.CREATE;
    this.clearAllInputs();
  }

  onConfirmDelete(toDelete: any) {
    toDelete = toDelete as T;
    this.dialogState = EditComponentStates.WAITING;
    this.clearAllInputs();
    this.deleteItem(toDelete).then((ok) => {
      if (ok) {
        this.items = this.items.filter((item) => item._id !== toDelete._id);
      }
      this.selectedItemIndex = null;
      this.dialogState = EditComponentStates.CREATE;
    });
  }

  abstract setInputsToSelectedItem(index: number): void;

  abstract inputShakeAnimation(): void;

  abstract clearAllInputs(): void;

  abstract fetchItems(): Promise<void>;

  abstract deleteItem(item: T): Promise<boolean>;

  abstract createSaveItem(item: T): Promise<boolean>;

  abstract editSaveItem(item: T, index: number): Promise<boolean>;

  async onSaveClick() {
    let _selectedItemIndex = this.selectedItemIndex;
    switch (this.dialogState as EditComponentStates) {
      case EditComponentStates.WAITING:
        return;
      case EditComponentStates.CREATE:
        this.createSaveItem({ ...this.item } as T).then((ok) => {
          this.dialogState = EditComponentStates.CREATE;
          if (ok) this.clearAllInputs();
        });
        break;
      case EditComponentStates.EDIT:
        if (this.selectedItemIndex === null) {
          console.log("Did not edit. Selected item index was null.");
          return;
        }
        this.editSaveItem(
          {
            ...this.item,
            _id: this.items[this.selectedItemIndex]._id,
          },
          this.selectedItemIndex
        ).then((ok) => {
          if (ok) {
            this.clearAllInputs();
            this.dialogState = EditComponentStates.CREATE;
          } else {
            this.selectedItemIndex = _selectedItemIndex;
            this.dialogState = EditComponentStates.EDIT;
          }
        });
        break;
    }
    this.selectedItemIndex = null;
    this.dialogState = EditComponentStates.WAITING;
  }
}
