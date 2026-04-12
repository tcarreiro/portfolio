import { Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuItem, SanityService } from "../../../../services/sanity.service";

@Component({
  selector: "app-navigation",
  imports: [CommonModule],
  templateUrl: "./navigation.html",
})
export class Navigation implements OnInit {
  private sanityService: SanityService = inject(SanityService);

  menuItems:WritableSignal<MenuItem[]> = signal<MenuItem[]>([]);

  async ngOnInit(): Promise<void> {
    const items = await this.sanityService.getMenuItems();
    this.menuItems.set(items);
  }

  navigateTo(host: string|undefined, route: string) {
    if (!route) return;
    window.dispatchEvent(
      new CustomEvent("navigate-event", {
        detail: { host: host, route: route },
      }),
    );
  }
}
