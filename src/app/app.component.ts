import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from "./test/test.component";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CreateTasksComponent } from "./task-manager/create-tasks/create-tasks.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TestComponent, NzButtonModule, CreateTasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngrx-pract';
}
