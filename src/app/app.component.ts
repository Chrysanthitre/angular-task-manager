import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from './models/task.model';
import { TaskService } from './services/task.service';
import { TaskStatsComponent } from './components/task-stats/task-stats.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TaskStatsComponent,
    AddTaskComponent,
    TaskListComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  onTaskAdded(title: string): void {
    this.taskService.addTask(title);
    this.loadTasks();
  }

  onTaskDeleted(id: number): void {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }

  onTaskToggled(id: number): void {
    this.taskService.toggleTask(id);
    this.loadTasks();
  }

  onPriorityChanged(event: { id: number, priority: 'low' | 'medium' | 'high' }): void {
    this.taskService.updateTaskPriority(event.id, event.priority);
    this.loadTasks();
  }

  get stats() {
    return this.taskService.getStats();
  }

  clearAllTasks(): void {
    if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone.')) {
      localStorage.removeItem('angularTasks');
      this.loadTasks();
    }
  }
}
