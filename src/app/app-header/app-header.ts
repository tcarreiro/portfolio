import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./app-header.html",
  styleUrls: ["../../styles.css"],
  standalone: true,
})
export class AppHeader {

  navigateTo(route: string) {
    window.dispatchEvent(
      new CustomEvent("navigate-event", {
        detail: { type: route },
      }),
    );
  }

}
