import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'angularTasks';

  getTasks(): Task[] {
    if (typeof window !== 'undefined') {
      const tasks = localStorage.getItem(this.storageKey);
      return tasks ? JSON.parse(tasks) : [];
    }
    return [];
  }

  private saveTasks(tasks: Task[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
  }

  addTask(title: string): Task {
    const tasks = this.getTasks();
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
      priority: 'medium'
    };

    tasks.unshift(newTask);
    this.saveTasks(tasks);
    return newTask;
  }

  deleteTask(id: number): void {
    const tasks = this.getTasks().filter(task => task.id !== id);
    this.saveTasks(tasks);
  }

  toggleTask(id: number): void {
    const tasks = this.getTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks(tasks);
    }
  }

  updateTaskPriority(id: number, priority: 'low' | 'medium' | 'high'): void {
    const tasks = this.getTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.priority = priority;
      this.saveTasks(tasks);
    }
  }

  getStats() {
    const tasks = this.getTasks();
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    return { total, completed, pending };
  }
}
