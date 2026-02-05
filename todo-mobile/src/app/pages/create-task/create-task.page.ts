import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonIcon, IonItem, IonLabel, IonDatetimeButton, IonModal, IonDatetime, IonTextarea, IonContent, IonInput, NavController } from '@ionic/angular/standalone';
import { CreateTaskDto } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';
import { HeaderComponent } from "src/app/components/header/header.component";
import { checkmarkCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
  standalone: true,
  imports: [CommonModule, CommonModule, FormsModule, IonButton, IonIcon,
    IonItem, IonLabel, IonDatetimeButton, IonModal, IonDatetime, HeaderComponent,
    IonTextarea, IonContent, IonInput, ReactiveFormsModule]
})
export class CreateTaskPage implements OnInit {
  taskForm!: FormGroup;

  taskData: CreateTaskDto = {
    title: '',
    description: '',
    completed: false,
    date: new Date().toISOString().split('T')[0]
  };

  constructor(
    private taskService: TaskService,
    private navCtrl: NavController
  ) {
    addIcons({ checkmarkCircleOutline });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.taskForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      description: new FormControl(''),
      date: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
      completed: new FormControl(false)
    });
  }

  /**
   * Valida y crea la tarea
   */
  createTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.taskService.createTask(this.taskForm.value);
    this.navCtrl.navigateBack('/home');
  }

  /**
   * Verifica si el formulario es válido
   */
  isFormValid(): boolean {
    return this.taskData.title.trim().length > 0;
  }

  /**
   * Cancela y regresa
   */
  cancel(): void {
    this.navCtrl.navigateBack('/home'); // Esto le indica a Ionic que es un cierre
  }

  /**
   * Obtener control del formulario por nombre
   */
  getControl(controlName: string) {
    return this.taskForm.get(controlName);
  }

}
