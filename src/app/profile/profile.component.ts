import { CommonModule, NgIf } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent {}
