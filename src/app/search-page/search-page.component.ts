import { CommonModule, NgIf } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-search-page",
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: "./search-page.component.html",
  styleUrl: "./search-page.component.css",
})
export class SearchPageComponent {}
