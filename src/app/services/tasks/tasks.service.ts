import { Injectable } from '@angular/core';
import axios, { Axios } from 'axios';
import { createTask } from './task.model';
import { from, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TasksService {


  private axiosInstance;

  constructor(private http: HttpClient) {
    // Create an Axios instance with default configuration
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:8000/', // Replace with your API's base URL
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  postCreatedTask(task: createTask){
    return this.axiosInstance.post('create-task', task)
  }
  getAllTask(){
    
    return from(
      this.axiosInstance.get('get-tasks')
    ).pipe(map((response) => response.data)); // Extract data here
  }
  // getAllTask(): Observable<createTask[]> {
  //   return this.http.get<createTask[]>('your-api-url');
  // }

}
