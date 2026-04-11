import { bootstrapApplication } from "@angular/platform-browser";
import { App } from "./app/app-content/app";
import { AppHeader } from "./app/app-header/app-header";
import { AppFooter } from "./app/app-footer/app-footer";
import { appConfig } from "./app/app-content/app.config";
import { appFooterConfig } from "./app/app-footer/app-footer.config";
import { appHeaderConfig } from "./app/app-header/app-header.config";

bootstrapApplication(AppHeader, appHeaderConfig).catch((err) => console.error(err));
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
bootstrapApplication(AppFooter, appFooterConfig).catch((err) => console.error(err));
