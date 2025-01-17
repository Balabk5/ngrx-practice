import { createAction, props } from '@ngrx/store';


export const addTask = createAction(
    '[Task] Add Task',
    props<{ id: string; title: string; status: string }>() // Payload definition
  );
export const deleteTask = createAction('[task] deleteTask')