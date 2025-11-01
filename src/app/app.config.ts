import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { registerLocaleData } from '@angular/common';

import localeEsHn from '@angular/common/locales/es-HN';
registerLocaleData(localeEsHn, 'es-Hn');

import { routes } from './app.routes';
import {
  AuthInterceptor,
  ErrorResponseInterceptor,
  SpinnerInterceptor,
} from '@shared/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-HN' },

    provideHttpClient(
      withFetch(),
      withInterceptors([
        ErrorResponseInterceptor,
        SpinnerInterceptor,
        AuthInterceptor,
      ])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
    MessageService,
    ConfirmationService,
  ],
};
