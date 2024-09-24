import { EditComponentStates } from "./../enums/edit-component-states";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICourse } from "../models/course.model";
import { ISubject } from "../models/subject.model";
import { FormsModule } from "@angular/forms";
import { SubjectsService } from "../services/subjects/subjects.service";
import { invoke } from "@tauri-apps/api/core";
import { PopupComponent } from "../popup/popup.component";
import { AdminTableComponent } from "../admin-table/admin-table.component";
import { EditItemsComponent } from "../edit-items/edit-items.component";
import { firstValueFrom } from "rxjs";
@Component({
  selector: "app-edit-subject",
  standalone: true,
  imports: [CommonModule, FormsModule, PopupComponent, AdminTableComponent],
  templateUrl: "./edit-subject.component.html",
  styleUrl: "./edit-subject.component.css",
})
export class EditSubjectComponent extends EditItemsComponent<ISubject> {
  override setInputsToSelectedItem(index: number): void {
    this.item.name = this.items[index].name;
  }
  override clearAllInputs(): void {
    this.item.name = "";
  }
  override fetchItems(): Promise<void> {
    return firstValueFrom(this.subjectsService.getSubjects()).then(
      (subjects) => {
        this.items = subjects;
        console.log(subjects);
      }
    );
  }

  override async deleteItem(item: ISubject): Promise<boolean> {
    let ok = await invoke<boolean>("delete_subject", {
      objId: item._id,
    });
    if (ok) {
      return Promise.resolve(true);
    } else {
      console.error("Deletion failed");
      return Promise.resolve(false);
    }
  }

  override async createSaveItem(item: ISubject): Promise<boolean> {
    if (item.name.length === 0) {
      this.inputShakeAnimation();
      return Promise.resolve(false);
    }
    let [ok, createdObjId] = await invoke<[boolean, string]>("create_subject", {
      name: item.name,
    });
    if (ok) {
      this.items.push({
        _id: createdObjId,
        name: item.name,
      } as ISubject);
      return Promise.resolve(true);
    } else {
      console.error("Failed to create subject.");
      return Promise.resolve(false);
    }
  }

  override async editSaveItem(item: ISubject, index: number): Promise<boolean> {
    if (this.item.name.length === 0) {
      this.inputShakeAnimation();
      return Promise.resolve(false);
    }
    let ok = await invoke<boolean>("update_subject_name", {
      objId: item._id,
      newName: item.name,
    });
    if (!ok) {
      console.error("Failed to update subject.");
    } else {
      this.items[index] = item;
    }
    return Promise.resolve(ok);
  }

  constructor(private subjectsService: SubjectsService) {
    super();
  }

  inputShakeAnimation() {
    let input = document.getElementById("name-input") as HTMLInputElement;
    input.classList.add("empty-input-anim");
    setTimeout(() => {
      input.classList.remove("empty-input-anim");
    }, 1000);
  }
}
