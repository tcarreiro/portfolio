import { Component } from "@angular/core";
import { Navigation } from "./features/navigation/navigation";

@Component({
  selector: "app-header",
  imports: [Navigation],
  templateUrl: "./app-header.html",
  styleUrls: ["../../../styles.css"],
  standalone: true,
})
export class AppHeader {
}
