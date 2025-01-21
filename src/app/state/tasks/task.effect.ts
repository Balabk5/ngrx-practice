import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TasksService } from '../../services/tasks/tasks.service';
import {
  loadTasks,
  loadTasksSuccess,
  loadTasksFailure,
} from '../tasks/tasks.action';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TasksService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      mergeMap(() =>
        this.taskService.getAllTask().pipe(
          map((tasks) => loadTasksSuccess({ tasks })),
          catchError((error) => of(loadTasksFailure({ error: error.message })))
        )
      )
    )
  );
}
