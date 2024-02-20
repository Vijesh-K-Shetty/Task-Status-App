import { Component } from '@angular/core';
import { TaskManageService } from 'src/app/services/task-manage.service';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {
  selectedTask: any;

  constructor(private taskService: TaskManageService
  ) { }

  ngOnInit(): void {
    this.selectedTask = this.taskService.getSelectedTask();
  }
}
