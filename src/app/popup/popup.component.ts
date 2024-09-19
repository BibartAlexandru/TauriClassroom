import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-popup",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./popup.component.html",
  styleUrl: "./popup.component.css",
})
export class PopupComponent {
  @Input({ required: true }) text: string = "";
  @Output() click: EventEmitter<string> = new EventEmitter();
  playEnterAnim = false;
  playExitAnim = false;

  ngAfterViewInit() {
    setTimeout(() => {
      this.playEnterAnim = true;
    }, 0);
  }

  onConfirm() {
    this.click.emit("yes");
    this.playEnterAnim = false;
    this.playExitAnim = true;
  }

  onCancel() {
    this.click.emit("no");
    this.playEnterAnim = false;
    this.playExitAnim = true;
  }
}
