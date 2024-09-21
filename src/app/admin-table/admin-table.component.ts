import { TableStates } from "./../enums/table-states";
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PopupComponent } from "../popup/popup.component";

@Component({
  selector: "app-admin-table",
  standalone: true,
  imports: [CommonModule, FormsModule, PopupComponent],
  templateUrl: "./admin-table.component.html",
  styleUrl: "./admin-table.component.css",
})
export class AdminTableComponent {
  @Input({ required: true }) disableTable: boolean = false;
  @Input({ required: true }) items: any[] = [];
  @Input({ required: true }) displayedAttributes: string[] = [];
  @Input({ required: true }) allowedClickIds: string[] = [];
  @Input({ required: true }) selectedItemIndex: number | null = null;
  @Output() selectedItem = new EventEmitter<number | null>();
  @Output() clickedOutsideTable = new EventEmitter<boolean>();
  @Output() clickedPlus = new EventEmitter<boolean>();
  @Output() confirmedDelete = new EventEmitter<any>();
  TableStates = TableStates;
  clicksOutsideTable = 0;
  popupText: string = "";
  popupVisible: boolean = false;
  itemToDeleteIndex: number | null = null;

  onClickOutsideTable(event: Event) {
    /*
    if (this.selectedItemIndex === null) return;
    if (event.target === null) return;
    let target = event.target as HTMLElement;
    let tableContainer = document.getElementById(
      "edit-subject-table-container"
    ) as HTMLDivElement;
    let allowedClicks: HTMLElement[] = [];
    for (let id of this.allowedClickIds) {
      let element = document.getElementById(id);
      if (element !== null) allowedClicks.push(element as HTMLElement);
    }
    let popup = document.getElementsByTagName("app-popup")[0] as HTMLElement;
    if (
      target !== tableContainer &&
      !tableContainer.contains(target) &&
      allowedClicks.find((val) => val === target) === undefined &&
      popup === undefined
    ) {
      //CLICK OUTSIDE
      if (this.clicksOutsideTable == 0) {
        this.clicksOutsideTable = 1;
        return;
      }
      this.clicksOutsideTable = 0;
      this.clickedOutsideTable.emit(true);
      console.log("CLICK OUTSIDE TABLE!");
    }
      */
  }

  ngOnInit() {
    document.addEventListener("click", this.onClickOutsideTable.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener("click", this.onClickOutsideTable);
  }

  selectItem(index: number) {
    console.log(`selected row: ${this.selectedItemIndex}`);
    this.selectedItem.emit(index);
  }

  onPlusClick() {
    this.clickedPlus.emit(true);
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
    this.popupText = `Are you sure you want to delete the ${this.items[index].name}`;
    this.popupVisible = true;
    this.itemToDeleteIndex = index;
  }

  onDeletePopupClick(event: string) {
    switch (event) {
      case "yes":
        this.confirmedDelete.emit(this.items[this.itemToDeleteIndex as number]);
        break;
      case "no":
        this.itemToDeleteIndex = null;
        break;
      default:
        return;
    }

    setTimeout(() => {
      this.popupVisible = false;
    }, 1000);
  }

  getRowClass(index: number): string {
    let res =
      index === this.selectedItemIndex ? "selected-row table-row-border" : "";
    if (index + 1 === this.selectedItemIndex) res += "table-row-border-bottom";
    return res;
  }
}
