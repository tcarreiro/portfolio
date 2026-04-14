import { signal } from "@angular/core";

export class GlobalStateService {
  private static instance: GlobalStateService;
  private _page = signal<string>("");
  private _host = signal<string>("");
  private _route = signal<string>("");

  private constructor() {}

  static getInstance(): GlobalStateService {
    if (!GlobalStateService.instance) {
      GlobalStateService.instance = new GlobalStateService();
    }
    return GlobalStateService.instance;
  }

  get page() {
    return this._page;
  }

  setPage(value: string) {
    this._page.set(value);
  }

  get host() {
    return this._host;
  }

  setHost(value: string) {
    this._host.set(value);
  }

  get route() {
    return this._route;
  }

  setRoute(value: string) {
    this._route.set(value);
  }
}
