import { EditComponentStates } from "./../enums/edit-component-states";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICourse } from "../models/course.model";
import { ISubject } from "../models/subject.model";
import { FormsModule } from "@angular/forms";
import { SubjectsService } from "../services/subjects/subjects.service";
import { invoke } from "@tauri-apps/api/core";

@Component({
  selector: "app-edit-subject",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./edit-subject.component.html",
  styleUrl: "./edit-subject.component.css",
})
export class EditSubjectComponent {
  EditComponentStates = EditComponentStates;
  dialogState = EditComponentStates.CREATE;
  subject: ISubject = {
    _id: "",
    name: "",
  };
  subjects: ISubject[] = [];
  selectedSubjectIndex: number | null = null;
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

  ngOnInit() {
    this.subjectsService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;
      console.log(subjects);
    });
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

  async onSave() {
    let ok: boolean = false;
    if (this.selectedSubjectIndex != null) {
      ok = await invoke<boolean>("update_subject_name", {
        objId: this.subjects[this.selectedSubjectIndex]._id,
        newName: this.subject.name,
      });
    } else {
      ok = await invoke<boolean>("create_subject", {
        name: this.subject.name,
      });
    }
    if (!ok) {
      console.error("Failed to update/create subject.");
    } else {
      this.subjects[this.selectedSubjectIndex as number].name =
        this.subject.name;
      this.subject.name = "";
      this.selectedSubjectIndex = null;
    }
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
