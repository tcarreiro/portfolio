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
  title = signal("AngularTest");
  contentType = signal("Home");

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
    this.contentType.set(type);
    this.clearContent();

    switch (type) {
      case "home":
        this.loadLandingPage();
        break;
      case "VueTest":
        this.loadFrontService("http://localhost:5173/main.js", "module");
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
      this.clearContent();
      this.renderedComponent = this.viewContainerRef.createComponent(module.LandingPageComponent);
    });
  }

  private loadFrontService(url: string, nome: string) {
    // Remove script anterior
    const oldScript = document.getElementById(`microfrontend-${nome}`);
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.id = `microfrontend-${nome}`;
    script.src = url;
    script.type = "module";

    script.onload = () => {
      console.log(`Script ${nome} carregado`);
      this.renderWebComponent(nome);
    };

    document.body.appendChild(script);
  }

  private renderWebComponent(nome: string) {
    this.clearContent();
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

    // Remove o script do VueTest se existir
    const oldScript = document.getElementById(`microfrontend-script-module`);
    if (oldScript) oldScript.remove();
  }
}
