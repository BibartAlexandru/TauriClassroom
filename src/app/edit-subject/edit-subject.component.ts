import { EditComponentStates } from "./../enums/edit-component-states";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICourse } from "../models/course.model";
import { ISubject } from "../models/subject.model";
import { FormsModule } from "@angular/forms";
import { SubjectsService } from "../services/subjects/subjects.service";

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
  }

  onSave() {
    console.log(`Saving subject: ${this.subject.name}`);
    this.subject.name = "";
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
