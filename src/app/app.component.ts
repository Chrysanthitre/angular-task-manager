import { Component, OnInit } from '@angular/core';
import { Task } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
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
