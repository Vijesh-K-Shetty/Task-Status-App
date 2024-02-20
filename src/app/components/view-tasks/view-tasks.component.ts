import { Component } from '@angular/core';
import { TaskManageService } from '../../services/task-manage.service';
import { TaskManage } from '../../models/task-manage.model';
import { DialogComponent } from '../common/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss']
})
export class ViewTasksComponent {
  tasks: TaskManage[] = [];

  constructor(private taskService: TaskManageService, public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.taskService.taskToEdit = '';
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(task: any) {
    const taskToBeDeleted = task;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateTaskList(taskToBeDeleted?.id); 
      }
    });
  }
  viewDetails(task: any) {
    this.taskService.setSelectedTask(task);
    this.router.navigate(['tasks/detail']);
  }
  updateTaskList(taskToRemove: any) {
    this.tasks = this.tasks.filter((task) => task.id !== taskToRemove);
    this.taskService.setTasks(this.tasks);

  }

  createTask() {
    this.taskService.setTasks(this.tasks);

    this.router.navigate(['tasks/create']);
  }
  editTask(task: any) {
    this.taskService.setTasks(this.tasks);

    this.taskService.taskToEdit = task;
    this.router.navigate(['tasks/create']);
  }

  markAsCompleted(taskId: number): void {
    const updatedTasks = this.tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });

    this.taskService?.setTasks(updatedTasks);
  }
}
