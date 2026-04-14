import { Component, EventEmitter, Input, Output } from "@angular/core";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: "mbutton",
  imports: [],
  templateUrl: "./mbutton.html",
  styleUrl: "./mbutton.css",
})
export class MButton {
  elementUUID: string;

  constructor() {
    this.elementUUID = uuidv4();
  }

  @Input() label: string = "";
  @Input() buttonClass: string = "";
  @Input() labelClass: string = "";
  @Input() icon: string = "";
  @Input() disabled: boolean = false;
  @Input() type: "primary" | "secondary" | "tertiary" = "primary";
  @Input() group: "brand" | "destructive" | "neutral" | "clear" = "brand";
  @Output() onClick = new EventEmitter<void>();
  @Output() onMouseEnter = new EventEmitter<void>();
  @Output() onMouseLeave = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }

  handleMouseEnter() {
    this.onMouseEnter.emit();
  }

  handleMouseLeave() {
    this.onMouseLeave.emit();
  }
}
