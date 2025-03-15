import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

export const main = () => bootstrapApplication(AppComponent, appConfig);

export default main;
