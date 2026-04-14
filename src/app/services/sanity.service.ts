import { Injectable } from "@angular/core";
import { createClient, type SanityClient } from "@sanity/client";

export interface MenuItem {
  _id: string;
  title: string;
  isClickable: boolean;
  actionType?: "local" | "microfront";
  route: string;
  host?: string;
  parent?: {
    _ref: string;
  };
  children: string[];
}

@Injectable({
  providedIn: "root",
})
export class SanityService {
  private client: SanityClient;

  constructor() {
    this.client = createClient({
      projectId: "8c30aqcb",
      dataset: "production",
      apiVersion: "2024-01-01",
      useCdn: true,
    });
  }

  async getMenuItems(): Promise<MenuItem[]> {
    const query: string = `*[_type == "menuItem"] | order(order asc) {
      _id,
      title,
      isClickable,
      actionType,
      route,
      host,
      parent,
      children,
    }`;

    const promise = await this.client.fetch(query);
    return this.mountChildren(promise);
  }

  mountChildren(items: MenuItem[]) {
    for (const item of items) {
      item.children = [];
    }
    for (const item of items) {
      if (item.parent) {
        const parent = items.find(it => it._id === item.parent?._ref);
        if (parent) {
          parent.children.push(item._id);
        }
      }
    }
    return items;
  }

}
