import { Component } from "@angular/core";
import { EditItemsComponent } from "../edit-items/edit-items.component";
import { ICourse } from "../models/course.model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AdminTableComponent } from "../admin-table/admin-table.component";
import { ISubject } from "../models/subject.model";
import { IUser } from "../models/user.model";
import { IClass } from "../models/class.model";
import { invoke } from "@tauri-apps/api/core";

@Component({
  selector: "app-edit-course",
  standalone: true,
  imports: [CommonModule, FormsModule, AdminTableComponent],
  templateUrl: "./edit-course.component.html",
  styleUrl: "./edit-course.component.css",
})
export class EditCourseComponent extends EditItemsComponent<ICourse> {
  subjects: ISubject[] = [];
  teachers: IUser[] = [];
  classes: IClass[] = [];
  currCourseSubjIndex: number = -1;
  currCourseTeacherIndex: number = -1;
  currCourseClassIndex: number = -1;
  override setInputsToSelectedItem(index: number): void {
    this.currCourseClassIndex = this.classes.findIndex(
      (c: IClass) => c._id === this.items[index].class_id
    );
    this.currCourseTeacherIndex = this.teachers.findIndex(
      (tch) => tch._id === this.items[index].teacher_id
    );
    this.currCourseSubjIndex = this.subjects.findIndex(
      (sbj) => sbj._id === this.items[index].subject_id
    );
  }
  override inputShakeAnimation(): void {
    // throw new Error("Method not implemented.");
  }
  override clearAllInputs(): void {
    this.currCourseClassIndex = -1;
    this.currCourseSubjIndex = -1;
    this.currCourseTeacherIndex = -1;
  }
  override async fetchItems(): Promise<void> {
    let [ok, received_courses] = await invoke<[boolean, ICourse[]]>(
      "get_courses",
      {}
    );
    if (!ok) {
      console.error("Failed to retreive courses");
      return;
    }
    this.items = received_courses;
  }
  override deleteItem(item: ICourse): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  override createSaveItem(item: ICourse): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  override editSaveItem(item: ICourse, index: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
