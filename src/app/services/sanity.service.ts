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
      parent
    }`;

    return await this.client.fetch(query);
  }

  buildMenuTree(items: MenuItem[]): MenuItemTreeNode[] {
    const itemMap: Map<string, MenuItemTreeNode> = new Map();
    const roots: MenuItemTreeNode[] = [];

    for (const item of items) {
      itemMap.set(item._id, { ...item, children: [] });
    }

    for (const item of items) {
      const node: MenuItemTreeNode = itemMap.get(item._id) as MenuItemTreeNode;

      if (item.parent?._ref) {
        const parent: MenuItemTreeNode | undefined = itemMap.get(item.parent._ref);

        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(node);
        } else {
          roots.push(node);
        }
      } else {
        roots.push(node);
      }
    }

    return roots;
  }
}

interface MenuItemTreeNode extends MenuItem {
  children: MenuItemTreeNode[];
}
