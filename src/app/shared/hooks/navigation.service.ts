// shared/navigation.service.ts
import { Injectable, WritableSignal } from "@angular/core";
import { GlobalStateService } from "../global-state";

@Injectable({ providedIn: "root" })
export class NavigationService {
  private globalState = GlobalStateService.getInstance();

  get page(): WritableSignal<string> {
    return this.globalState.page;
  }

  set page(value: string) {
    this.globalState.setPage(value);
  }

  get host(): WritableSignal<string> {
    return this.globalState.host;
  }

  set host(value: string) {
    this.globalState.setHost(value);
  }

  get route(): WritableSignal<string> {
    return this.globalState.route;
  }

  set route(value: string) {
    this.globalState.setRoute(value);
  }

  localPage() {
    return !this.host || this.host() === "";
  }

  navigateTo(route: string, host: string = "") {
    this.route.set(route);
    this.host.set(host);
    this.page.set(host !== null ? `${host}/${route}` : route);
  }
}
