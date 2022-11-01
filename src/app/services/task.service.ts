import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { Task } from '../Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';
  private data: Task[] = []

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    let data = JSON.parse(localStorage.getItem("data") ?? '[]')
    return of(data);
  }

  deleteTask(task: Task): Observable<Task> {
    // const url = `${this.apiUrl}/${task.id}`;
    let data: Task[] = JSON.parse(localStorage.getItem("data"))
    data = data.filter((x) => x.id !== task.id)
    localStorage.setItem("data", JSON.stringify(data))
    return of(task)
    // return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    let data: Task[] = JSON.parse(localStorage.getItem("data"))
    data = data.map(x => {
      return x.id === task.id ? task : x
    })
    localStorage.setItem("data", JSON.stringify(data))
    return of(task)
    // return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Task {
    let data: Task[] = JSON.parse(localStorage.getItem("data") ?? '[]')
    if (data) {
      task.id = data.length
      data.push(task)
    } else {
      task.id = 1
      data = [task]
    }
    localStorage.setItem("data", JSON.stringify(data))
    return data[data.length - 1]
    // return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }
}
