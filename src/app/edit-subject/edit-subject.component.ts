import { EditComponentStates } from "./../enums/edit-component-states";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICourse } from "../models/course.model";
import { ISubject } from "../models/subject.model";
import { FormsModule } from "@angular/forms";
import { SubjectsService } from "../services/subjects/subjects.service";
import { invoke } from "@tauri-apps/api/core";
import { timeout } from "rxjs";
import { PopupComponent } from "../popup/popup.component";
@Component({
  selector: "app-edit-subject",
  standalone: true,
  imports: [CommonModule, FormsModule, PopupComponent],
  templateUrl: "./edit-subject.component.html",
  styleUrl: "./edit-subject.component.css",
})
export class EditSubjectComponent {
  EditComponentStates = EditComponentStates;
  dialogState = EditComponentStates.CREATE;
  popupVisible = false;
  popupText: string = "";
  subject: ISubject = {
    _id: "",
    name: "",
  };
  subjects: ISubject[] = [];
  selectedSubjectIndex: number | null = null;
  subjectToDeleteIndex: number | null = null;
  clicksOutsideTable: number = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private subjectsService: SubjectsService
  ) {
    activatedRoute.paramMap.subscribe((params) => {
      if (params.get("id") !== null) {
        console.log(params.get("id"));
        this.dialogState = EditComponentStates.EDIT;
      }
      console.log(EditComponentStates[this.dialogState]);
    });
  }

  onClickOutsideTable(event: Event) {
    if (this.selectedSubjectIndex === null) return;
    if (event.target === null) return;
    let target = event.target as HTMLElement;
    let tableContainer = document.getElementById(
      "edit-subject-table-container"
    ) as HTMLDivElement;
    let allowedClicks: HTMLElement[] = [];
    allowedClicks.push(document.getElementById("name-input") as HTMLElement);
    allowedClicks.push(document.getElementById("save-btn") as HTMLElement);
    if (
      target !== tableContainer &&
      !tableContainer.contains(target) &&
      allowedClicks.find((val) => val === target) === undefined
    ) {
      if (this.clicksOutsideTable == 0) {
        this.clicksOutsideTable = 1;
        return;
      }
      this.clicksOutsideTable = 0;
      this.dialogState = EditComponentStates.CREATE;
      this.selectedSubjectIndex = null;
      this.subject.name = "";
      console.log("CLICK OUTSIDE TABLE!");
    }
  }

  ngOnInit() {
    document.addEventListener("click", this.onClickOutsideTable.bind(this));
    this.subjectsService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;
      console.log(subjects);
    });
  }

  ngOnDestroy() {
    document.removeEventListener("click", this.onClickOutsideTable);
  }

  selectSubject(index: number) {
    this.selectedSubjectIndex = index;
    console.log(`selected row: ${this.selectedSubjectIndex}`);
    this.dialogState = EditComponentStates.EDIT;
    this.subject.name = this.subjects[index].name;
  }

  onPlusClick() {
    this.selectedSubjectIndex = null;
    this.dialogState = EditComponentStates.CREATE;
    this.subject.name = "";
  }

  inputShakeAnimation() {
    let input = document.getElementById("name-input") as HTMLInputElement;
    input.classList.add("empty-input-anim");
    setTimeout(() => {
      input.classList.remove("empty-input-anim");
    }, 1000);
  }

  onDelete(event: Event, index: number) {
    event.stopPropagation();
    this.popupText = `Are you sure you want to delete the ${this.subjects[index].name}`;
    this.popupVisible = true;
    this.subjectToDeleteIndex = index;
  }

  onDeletePopupClick(event: string) {
    switch (event) {
      case "yes":
        this.dialogState = EditComponentStates.WAITING;
        invoke<boolean>("delete_subject", {
          objId: this.subjects[this.subjectToDeleteIndex as number]._id,
        }).then((ok) => {
          this.dialogState = EditComponentStates.CREATE;
          if (!ok) {
            console.error("Deletion failed");
            this.subjectToDeleteIndex = null;
            return;
          }
          this.subjects = this.subjects.filter(
            (s, index) => index !== this.subjectToDeleteIndex
          );
          this.subjectToDeleteIndex = null;
        });
        break;
      case "no":
        this.subjectToDeleteIndex = null;
        break;
      default:
        return;
    }

    setTimeout(() => {
      this.popupVisible = false;
    }, 1000);
  }

  async onSave() {
    let ok: boolean = false;
    let newName = this.subject.name;
    let selectedCourseObjId =
      this.selectedSubjectIndex === null
        ? null
        : this.subjects[this.selectedSubjectIndex]._id;
    this.subject.name = "";
    let subjIndex = this.selectedSubjectIndex;
    switch (this.dialogState as EditComponentStates) {
      case EditComponentStates.WAITING:
        return;
      case EditComponentStates.CREATE:
        if (newName.length === 0) {
          this.inputShakeAnimation();
          return;
        }
        invoke<[boolean, string]>("create_subject", {
          name: newName,
        }).then(([ok, createdObjId]) => {
          this.dialogState = EditComponentStates.CREATE;
          if (ok) {
            this.subjects.push({
              _id: createdObjId,
              name: newName,
            } as ISubject);
          } else console.error("Failed to create subject.");
        });
        break;
      case EditComponentStates.EDIT:
        if (newName.length === 0) {
          this.inputShakeAnimation();
          return;
        }
        if (subjIndex === null) return; //can't be null
        invoke<boolean>("update_subject_name", {
          objId: selectedCourseObjId,
          newName: newName,
        }).then((ok) => {
          this.dialogState = EditComponentStates.CREATE;
          console.log("finished saving!");
          if (ok) {
            this.subjects[subjIndex as number].name = newName;
          } else console.error("Failed to update subject.");
        });
        break;
    }
    this.selectedSubjectIndex = null;
    this.dialogState = EditComponentStates.WAITING;
  }

  getRowClass(index: number): string {
    let res =
      index === this.selectedSubjectIndex
        ? "selected-row table-row-border"
        : "";
    if (index + 1 === this.selectedSubjectIndex)
      res += "table-row-border-bottom";
    return res;
  }
}
