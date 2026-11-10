import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggerInterceptor } from './core/interceptors/logger-interceptor';
import { erroresInterceptor } from './core/interceptors/errores-interceptor';

// Formato español para importes y números (CurrencyPipe, DecimalPipe…).
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([loggerInterceptor,erroresInterceptor])),
    provideRouter(routes), provideClientHydration()
  ]
};
