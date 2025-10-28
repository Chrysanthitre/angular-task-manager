import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() taskToggled = new EventEmitter<number>();
  @Output() priorityChanged = new EventEmitter<{id: number, priority: 'low' | 'medium' | 'high'}>();

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high': return 'border-danger bg-danger bg-opacity-10';
      case 'medium': return 'border-warning bg-warning bg-opacity-10';
      case 'low': return 'border-info bg-info bg-opacity-10';
      default: return 'border-light';
    }
  }

  getPriorityText(priority: string): string {
    switch (priority) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return 'Medium';
    }
  }

  onDeleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskDeleted.emit(id);
    }
  }

  onToggleTask(id: number): void {
    this.taskToggled.emit(id);
  }

  onPriorityChange(id: number, event: any): void {
    this.priorityChanged.emit({
      id: id,
      priority: event.target.value
    });
  }
}