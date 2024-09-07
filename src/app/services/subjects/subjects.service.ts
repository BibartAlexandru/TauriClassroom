import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { ISubject } from "../../models/subject.model";
import { invoke } from "@tauri-apps/api/core";

@Injectable({
  providedIn: "root",
})
export class SubjectsService {
  constructor() {}

  getSubjects(): Observable<ISubject[]> {
    return from(invoke<ISubject[]>("get_subjects"));
  }
}
