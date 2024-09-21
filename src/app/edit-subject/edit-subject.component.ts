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
@Component({
  selector: "app-edit-subject",
  standalone: true,
  imports: [CommonModule, FormsModule, PopupComponent, AdminTableComponent],
  templateUrl: "./edit-subject.component.html",
  styleUrl: "./edit-subject.component.css",
})
export class EditSubjectComponent {
  EditComponentStates = EditComponentStates;
  dialogState = EditComponentStates.WAITING;
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
    // activatedRoute.paramMap.subscribe((params) => {
    //   if (params.get("id") !== null) {
    //     console.log(params.get("id"));
    //     this.dialogState = EditComponentStates.EDIT;
    //   }
    //   console.log(EditComponentStates[this.dialogState]);
    // });
  }

  onClickOutsideTable2(event: boolean) {
    this.dialogState = EditComponentStates.CREATE;
    this.subject.name = "";
    this.selectedSubjectIndex = null;
  }

  ngOnInit() {
    this.subjectsService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;
      console.log(subjects);
      this.dialogState = EditComponentStates.CREATE;
    });
  }

  selectSubject(index: number | null) {
    if (index === null) return;
    this.dialogState = EditComponentStates.EDIT;
    this.subject.name = this.subjects[index].name;
    this.selectedSubjectIndex = index;
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

  onConfirmDelete(toDelete: any) {
    toDelete = toDelete as ISubject;
    this.dialogState = EditComponentStates.WAITING;
    invoke<boolean>("delete_subject", {
      objId: toDelete._id,
    }).then((ok) => {
      this.dialogState = EditComponentStates.CREATE;
      if (!ok) {
        console.error("Deletion failed");
        return;
      }
      this.subjects = this.subjects.filter((s) => s._id !== toDelete._id);
      this.selectedSubjectIndex = null;
    });
  }

  async onSave() {
    let newName = this.subject.name;
    let selectedSubjObjId =
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
        console.log(`Subjs index : ${subjIndex}`);
        if (subjIndex === null) return; //can't be null
        invoke<boolean>("update_subject_name", {
          objId: selectedSubjObjId,
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
}
