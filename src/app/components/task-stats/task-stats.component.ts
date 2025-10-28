import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-stats.component.html',
  styleUrls: ['./task-stats.component.css']
})
export class TaskStatsComponent {
  @Input() stats: { total: number, completed: number, pending: number } = {
    total: 0, completed: 0, pending: 0
  };

  get completionPercentage(): number {
    return this.stats.total > 0 ?
      Math.round((this.stats.completed / this.stats.total) * 100) : 0;
  }
}