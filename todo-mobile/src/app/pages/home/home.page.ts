import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, IonFab, IonFabButton, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/angular/standalone";
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';
import { TaskCardComponent } from 'src/app/components/task-card/task-card.component';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { add, searchOutline } from 'ionicons/icons';
import { HeaderComponent } from "src/app/components/header/header.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, TaskCardComponent, FormsModule, IonContent, IonIcon, IonFab, IonFabButton, IonSearchbar, HeaderComponent, IonInfiniteScroll, IonInfiniteScrollContent],
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(IonContent, { static: false }) content?: IonContent;

  todos: Task[] = [];
  filteredTodos: Task[] = [];
  searchTerm: string = '';
  private subscription?: Subscription;
  private taskCreatedSubscription?: Subscription;

  constructor(
    private tasksService: TaskService,
    private router: Router
  ) {
    addIcons({ add, searchOutline });
  }

  ngOnInit(): void {
    // Suscribirse a cambios en las tareas
    this.subscription = this.tasksService.tasks$.subscribe(tasks => {
      this.todos = tasks;
      this.filterTodos();
    });
  }

  ngAfterViewInit(): void {
    // Suscribirse después de que la vista esté lista
    this.taskCreatedSubscription = this.tasksService.taskCreated$.subscribe(() => {
      setTimeout(() => {
        this.content?.scrollToTop(300);
      }, 100);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.taskCreatedSubscription?.unsubscribe();
  }

  /**
   * Filtra tareas según término de búsqueda
   */
  filterTodos(): void {
    if (!this.searchTerm.trim()) {
      this.filteredTodos = this.todos;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredTodos = this.todos.filter(todo =>
      todo.title.toLowerCase().includes(term) ||
      todo.description?.toLowerCase().includes(term)
    );
  }

  /**
   * Maneja cambios en el buscador
   */
  onSearchChange(event: any): void {
    this.searchTerm = event.detail.value || '';
    this.filterTodos();
  }

  /**
   * Navega al detalle de una tarea
   */
  goToDetail(task: Task): void {
    this.router.navigate(['/task-detail', task.id]);
  }

  /**
   * Navega al formulario de crear tarea
   */
  goToCreate(): void {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    this.router.navigate(['/create-task']);
  }

  /**
   * Cargar más tareas al hacer scroll
   */
  onLoadMore(event: any) {
    this.tasksService.loadMoreTasks().subscribe({
      next: () => {
        event.target.complete();
      },
      error: () => {
        event.target.complete();
      }
    });
  }
}