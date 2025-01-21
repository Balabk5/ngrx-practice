import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { TasksService } from '../../services/tasks/tasks.service';
import {
  createTask,
  taskPriority,
  taskStatus,
} from '../../services/tasks/task.model';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-create-tasks',
  standalone: true,
  imports: [
    NzButtonModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    FormsModule,
    NzSegmentedModule,
    ReactiveFormsModule,
    NzDatePickerModule
  ],
  templateUrl: './create-tasks.component.html',
  styleUrl: './create-tasks.component.scss',
})
export class CreateTasksComponent {
  statusOptions: string[] = Object.values(taskStatus);
  priorityOptions: string[] = Object.values(taskPriority);

  constructor(private task: TasksService) {}

  taskForm = new FormGroup({
    Id: new FormControl(0),
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    status: new FormControl(taskStatus.PENDING, [Validators.required]),
    priority: new FormControl(taskPriority.LOW, [Validators.required]),
  });




  handleTaskStatus(e: number): void {
    const statusValue = Object.values(taskStatus)[e]; // Get the value by index

    // Set the value to the form control
    this.taskForm.get('status')?.setValue(statusValue);
  }


  
  handleTaskPriority(e: number): void {
    const priorityValue = Object.values(taskPriority)[e]; // Get the value by index

    // Set the value to the form control
    this.taskForm.get('priority')?.setValue(priorityValue);
  }

  createTask() {
    const formValues = this.taskForm.value;

    // if (this.taskForm.valid) {
    const createTaskData: createTask = {
      Id: this.taskForm.get('Id')?.value ?? 0,
      title: this.taskForm.get('title')?.value ?? '',
      description: this.taskForm.get('description')?.value ?? '', // Assign the FormControl instance
      status:
        (this.taskForm.get('status')?.value as taskStatus) ??
        taskStatus.PENDING,
      priority:
        (this.taskForm.get('priority')?.value as taskPriority) ??
        taskPriority.LOW,
    };
    // Ensure the form data is sanitized and complete
    this.task.postCreatedTask(createTaskData);
    console.log(formValues);
    console.log(createTaskData);
    // }
  }
}
