import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTasksComponent } from './components/view-tasks/view-tasks.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: ViewTasksComponent
  },
  {
    path: 'tasks/detail',
    component: TaskDetailsComponent
  },
  {
    path: 'tasks/create',
    component: CreateTaskComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
