import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggerInterceptor } from './core/interceptors/logger-interceptor';
import { erroresInterceptor } from './core/interceptors/errores-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([loggerInterceptor,erroresInterceptor])),
    provideRouter(routes), provideClientHydration()
  ]
};
