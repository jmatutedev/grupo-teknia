import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.interface';
import { addIcons } from 'ionicons';
import { 
  calendarOutline, 
  trashOutline, 
  checkmarkCircleOutline, 
  closeCircleOutline,
  keyOutline
} from 'ionicons/icons';
import { HeaderComponent } from "src/app/components/header/header.component";
import { TaskCardComponent } from "src/app/components/task-card/task-card.component";

@Component({
  selector: 'app-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent, TaskCardComponent],
})
export class TaskDetailPage implements OnInit {
  task?: Task;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private alertController: AlertController
  ) {
    addIcons({ 
      calendarOutline, 
      trashOutline, 
      checkmarkCircleOutline, 
      closeCircleOutline,
      'hash-outline': keyOutline
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTaskById(id);

    if (!this.task) {
      this.router.navigate(['/home']);
    }
  }

  /**
   * Cambia el estado de la tarea
   */
  toggleStatus(): void {
    if (!this.task) return;

    this.taskService.changeTaskStatus(this.task.id);
    this.task = this.taskService.getTaskById(this.task.id);
  }

  /**
   * Elimina la tarea con confirmación
   */
  async deleteTodo(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Eliminar tarea',
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            if (this.task) {
              this.taskService.deleteTask(this.task.id);
              this.router.navigate(['/home']);
            }
          }
        }
      ]
    });

    await alert.present();
  }

}