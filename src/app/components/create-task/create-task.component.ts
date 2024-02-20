import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createFind } from 'rxjs/internal/operators/find';
import { TaskManage } from 'src/app/models/task-manage.model';
import { TaskManageService } from 'src/app/services/task-manage.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})

export class CreateTaskComponent implements OnInit {
  taskForm: FormGroup;
  tasks: any = [];

  constructor(private fb: FormBuilder,
    private taskService: TaskManageService,
    private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: [null, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
    if (this.taskService?.taskToEdit) {
      this.taskForm.patchValue({
        title: this.taskService?.taskToEdit?.title,
        description: this.taskService?.taskToEdit?.description,
        dueDate: this.taskService?.taskToEdit?.dueDate,
      })
    }
  }
  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return date >= currentDate;
  };

  onSubmit() {
    if (this.taskForm.valid) {
      const taskToEdit = this.taskService?.taskToEdit;
      const taskDetails = this.taskForm.value;
  
      if (taskToEdit) {
        const updatedTasks = this.tasks.map((task: TaskManage) => {
          if (task.id === taskToEdit.id) {
            return { ...task, title: taskDetails.title, description: taskDetails.description, dueDate: taskDetails.dueDate };
          }
          return task;
        });
        this.taskService.setTasks(updatedTasks);
      } else {
        const newTask: TaskManage = {
          id: this.generateID(), 
          title: taskDetails.title,
          description: taskDetails.description,
          dueDate: taskDetails.dueDate,
          completed: false, 
        };
  
        this.taskService.setTasks([...this.tasks, newTask]);
      }
  
      this.taskService.taskToEdit = null;
      this.router.navigate(['tasks']);

    }
  }
  generateID(): number {
    const maxId = this.tasks.reduce((max:any, task:TaskManage) => (task.id > max ? task.id : max), 0);
  
    return maxId + 1;
  }
  
}


