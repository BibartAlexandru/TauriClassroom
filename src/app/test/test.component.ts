import { Component } from "@angular/core";
import { invoke } from "@tauri-apps/api/core";

@Component({
  selector: "app-test",
  standalone: true,
  imports: [],
  templateUrl: "./test.component.html",
  styleUrl: "./test.component.css",
})
export class TestComponent {
  message: string = "NO MESSAGE!";

  changeMessage() {
    const prevMessage = this.message;
    invoke<string>("get_random_message", { prevMessage: prevMessage }).then(
      (new_message) => (this.message = new_message)
    );
  }
}
