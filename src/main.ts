import { bootstrapApplication } from "@angular/platform-browser";
import { App } from "./app/content/app-content/app";
import { AppHeader } from "./app/header/app-header/app-header";
import { AppFooter } from "./app/footer/app-footer/app-footer";
import { appConfig } from "./app/content/app-content/app.config";
import { appFooterConfig } from "./app/footer/app-footer/app-footer.config";
import { appHeaderConfig } from "./app/header/app-header/app-header.config";

bootstrapApplication(AppHeader, appHeaderConfig).catch((err) => console.error(err));
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
bootstrapApplication(AppFooter, appFooterConfig).catch((err) => console.error(err));
