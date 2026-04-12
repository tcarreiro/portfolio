import {
  Component,
  ComponentRef,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
  ViewContainerRef,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-content",
  imports: [CommonModule],
  templateUrl: "./app.html",
  styleUrls: ["../../styles.css"],
  standalone: true,
})
export class App implements OnInit, OnDestroy {
  title = signal("PortfolioPortal");

  private eventListener: ((event: CustomEvent) => void) | undefined;
  private renderedComponent: ComponentRef<Component> | null = null;
  private elementRef = inject(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);

  ngOnInit(): void {
    this.eventListener = (event: CustomEvent) => {
      const { type } = event.detail;
      this.loadContent(type);
    };

    window.addEventListener("navigate-event", this.eventListener as EventListener);

    this.loadContent("home");
  }
  ngOnDestroy() {
    window.removeEventListener("navigate-event", this.eventListener as EventListener);
  }

  loadContent(type: string): void {
    this.clearContent();

    switch (type) {
      case "home":
        this.loadLandingPage();
        break;
      case "VueTest":
        this.loadFrontService("https://tcarreiro.github.com/vuepage/main.js", "module");
        break;
      case "servico2":
        this.loadFrontService("http://localhost:4204/main.js", "servico2");
        break;
      default:
        this.loadLandingPage();
    }
  }

  private loadLandingPage() {
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
    const oldScript = document.getElementById(`microfrontend-${nome}`);
    if (oldScript) oldScript.remove();

    const oldCss = document.getElementById(`microfrontend-css-${nome}`);
    if (oldCss) oldCss.remove();

    const cssUrl = url.replace(".js", ".css");
    const link = document.createElement("link");
    link.id = `microfrontend-css-${nome}`;
    link.rel = "stylesheet";
    link.href = cssUrl;
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.id = `microfrontend-${nome}`;
    script.src = url;
    script.type = "module";

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
