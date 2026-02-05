import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonCard, IonCardContent, IonIcon } from "@ionic/angular/standalone";
import { Task } from 'src/app/models/task.interface';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, CommonModule, IonIcon]
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() clickedTask = new EventEmitter<Task>();
  @Input() showDetail: boolean = false;

  taskClicked() {
    if (!this.showDetail) {
      this.clickedTask.emit(this.task);
    }
  }
}