import { Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuItem, SanityService } from "../../../../services/sanity.service";
import { MButton } from "../../../../features/components/forms/mbutton/mbutton";
import { NavigationService } from "../../../../shared/hooks/navigation.service";

@Component({
  selector: "app-navigation",
  imports: [CommonModule, MButton],
  templateUrl: "./navigation.html",
  styleUrls: ["./navigation.css"],
})
export class Navigation implements OnInit {
  protected navigationService = inject(NavigationService);
  private sanityService: SanityService = inject(SanityService);

  activeItemIndex: WritableSignal<number> = signal<number>(-1);
  activeItem: WritableSignal<MenuItem | null> = signal<MenuItem | null>(null);
  menuItems: WritableSignal<MenuItem[]> = signal<MenuItem[]>([]);

  async ngOnInit(): Promise<void> {
    const items = await this.sanityService.getMenuItems();
    this.menuItems.set(items);
  }

  getRoots() {
    return this.menuItems().filter((item) => !item.parent);
  }

  getChildren(item: MenuItem) {
    if (!item) return;
    return this.menuItems().filter((it) => it.parent && it.parent._ref === item._id);
  }

  protected handleMouseClick(item: MenuItem, index: number) {
    if (item.children.length <= 0) {
      const route = item.route;
      const host = item.host ?? "";

      this.navigationService.navigateTo(route, host);
      // this.navigationService.host.set(host);
      // this.navigationService.page.set(host ? `${host}/${route}` : route);

      this.activeItemIndex.set(index);
      this.activeItem.set(null);
      this.activeItemIndex.set(-1);
    }
    if (this.activeItemIndex() === index) {
      this.activeItemIndex.set(-1);
      this.activeItem.set(null);
    } else if (item.children.length > 0) {
      this.activeItemIndex.set(index);
      this.activeItem.set(item);
    }
  }
}
