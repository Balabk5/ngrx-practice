import { createReducer, on } from '@ngrx/store';
import {  loadTasks, loadTasksFailure, loadTasksSuccess } from './tasks.action';
import { createTask } from '../../services/tasks/task.model';


// export const initialTaskState: { id: string; title: string; status: string }[] = [];

export interface TaskState {
    tasks: createTask[];
    loading: boolean;
    error: string | null;
  }
  
  export const initialTaskState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
  };
  


  export const taskReducer = createReducer(
    initialTaskState,
    on(loadTasks, (state) => ({ ...state, loading: true, error: null })), // ✅ Start loading here
    on(loadTasksSuccess, (state, { tasks }) => ({
      ...state,
      loading: false, // ✅ Mark loading as false
      tasks,
      error: null
    })),
    on(loadTasksFailure, (state, { error }) => ({
      ...state,
      loading: false, // ✅ Mark loading as false
      error
    }))
  );
  
