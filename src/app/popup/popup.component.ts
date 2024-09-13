import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-popup",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./popup.component.html",
  styleUrl: "./popup.component.css",
})
export class PopupComponent {
  @Input({ required: true }) text: string = "";
}
