import { createAction, props } from '@ngrx/store';
import { createTask } from '../../services/tasks/task.model';


// export const addTask = createAction(
//     '[Task] Add Task',
//     props<{ id: string; title: string; status: string }>() 
//   );
// export const deleteTask = createAction('[task] deleteTask')

export const loadTasks = createAction('[Task] Load Tasks');


export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: createTask[] }>()
);

// Load tasks failure
export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: string }>()
);