import { Component, ComponentRef, ElementRef, signal, ViewContainerRef, inject, effect, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationService } from "../../shared/hooks/navigation.service";

@Component({
  selector: "app-content",
  imports: [CommonModule],
  templateUrl: "./app.html",
  styleUrls: ["../../../styles.css"],
  standalone: true,
})
export class App implements OnInit {
  protected navigationService = inject(NavigationService);
  title = signal("PortfolioPortal");

  private renderedComponent: ComponentRef<Component> | null = null;
  private elementRef = inject(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const currentPage = this.navigationService.page();
      this.loadContent(currentPage);
    });
  }
  ngOnInit(): void {
    this.navigationService.navigateTo("home", "");
  }

  loadContent(currentPage: string): void {
    this.clearContent();
    if (this.navigationService.localPage()) this.loadLocalPage();
    else this.loadFrontService(`${currentPage}/main.js`, "module");
  }

  private loadLocalPage() {
    import("./features/landing-page/landing-page").then((module) => {
      const container = this.elementRef.nativeElement.querySelector(".content");
      if (container) {
        container.innerHTML = "";
        this.renderedComponent = this.viewContainerRef.createComponent(module.LandingPageComponent);
        const element = this.renderedComponent.location.nativeElement;
        container.appendChild(element);
      }
    });
  }

  private loadFrontService(url: string, nome: string) {
    const scriptName = `microfrontend-${nome}`;
    const cssName = `microfrontend-css-${nome}`;

    const oldScript = document.getElementById(scriptName);
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.id = scriptName;
    script.src = url;
    script.type = "module";

    const oldCss = document.getElementById(cssName);
    if (oldCss) oldCss.remove();

    const cssUrl = url.replace(".js", ".css");
    const link = document.createElement("link");
    link.id = cssName;
    link.rel = "stylesheet";
    link.href = cssUrl;
    document.head.appendChild(link);

    script.onload = () => {
      this.renderWebComponent(nome);
    };

    document.body.appendChild(script);
  }

  private renderWebComponent(nome: string) {
    const container = this.elementRef.nativeElement.querySelector(".content");
    if (container) {
      const webComponent = document.createElement(`app-${nome.toLowerCase()}`);
      container.appendChild(webComponent);
    }
  }

  clearContent(): void {
    if (this.renderedComponent) {
      this.renderedComponent.destroy();
      this.renderedComponent = null;
    }

    const container = this.elementRef.nativeElement.querySelector(".content");
    if (container) {
      container.innerHTML = "";
    }

    const scripts = document.querySelectorAll('script[id^="microfrontend-"]');
    scripts.forEach((script) => script.remove());

    const styles = document.querySelectorAll('link[id^="microfrontend-css-"]');
    styles.forEach((style) => style.remove());
  }
}
