import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Asegurar que las rutas están registradas
    provideHttpClient()    // Asegurar que HttpClient está disponible en toda la app
  ]
}).catch(err => console.error(err));
