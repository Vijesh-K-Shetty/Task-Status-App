import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskManage } from '../models/task-manage.model';
@Injectable({
  providedIn: 'root'
})
export class TaskManageService {
  private task: any;
  private tasks: BehaviorSubject<TaskManage[]> = new BehaviorSubject<TaskManage[]>([]);
  public taskToEdit: any;
  setTasks(data: any){
    this.tasks.next(data);
  }
  getTasks(): Observable<TaskManage[]> {
    return this.tasks.asObservable();
  }
  setSelectedTask(taskDetail: any){
    this.task = taskDetail; 
  }
  getSelectedTask(){
    return this.task;
  }
  
}
