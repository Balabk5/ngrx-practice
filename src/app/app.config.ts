import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { counterReducer } from './state/counter.reducer';
import { taskReducer } from './state/tasks/tasks.reducer';
import { provideEffects } from '@ngrx/effects';
import { TaskEffects } from './state/tasks/task.effect';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),  
     provideStore({ count: counterReducer, task: taskReducer },),
     provideEffects(TaskEffects),
    provideStoreDevtools(),
    provideHttpClient()
    ]
};
