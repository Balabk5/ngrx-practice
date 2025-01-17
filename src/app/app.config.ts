import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { counterReducer } from './state/counter.reducer';
import { taskReducer } from './state/tasks/tasks.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),   provideStore({ count: counterReducer, task: taskReducer },),
    provideStoreDevtools(),
    provideAnimations()]
};
