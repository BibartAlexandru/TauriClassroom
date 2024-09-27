import { Component } from "@angular/core";
import { EditItemsComponent } from "../edit-items/edit-items.component";
import { ICourse } from "../models/course.model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AdminTableComponent } from "../admin-table/admin-table.component";

@Component({
  selector: "app-edit-course",
  standalone: true,
  imports: [CommonModule, FormsModule, AdminTableComponent],
  templateUrl: "./edit-course.component.html",
  styleUrl: "./edit-course.component.css",
})
export class EditCourseComponent extends EditItemsComponent<ICourse> {
  override setInputsToSelectedItem(index: number): void {
    throw new Error("Method not implemented.");
  }
  override inputShakeAnimation(): void {
    throw new Error("Method not implemented.");
  }
  override clearAllInputs(): void {
    throw new Error("Method not implemented.");
  }
  override fetchItems(): Promise<void> {
    throw new Error("Method not implemented.");
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
