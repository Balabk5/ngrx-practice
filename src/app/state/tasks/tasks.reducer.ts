import { createReducer, on } from '@ngrx/store';
import { addTask, deleteTask } from './tasks.action';


export const initialTaskState: { id: string; title: string; status: string }[] = [];


export const taskReducer = createReducer(
    initialTaskState,
    on(addTask, (state, { id, title, status }) => [...state, { id, title, status }]), // Add the task to the state
    on(deleteTask, (state, )=> state),
)