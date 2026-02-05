import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Task, CreateTaskDto } from '../models/task.interface';
import { UiService } from './ui-messages.service';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';
    private storageName = 'bipay_tasks';
    private currentLimit = 10;
    private isFetching = false;
    private tasksSubject = new BehaviorSubject<Task[]>([]);
    public tasks$ = this.tasksSubject.asObservable();
    private taskCreatedSource = new Subject<void>();
    taskCreated$ = this.taskCreatedSource.asObservable();

    constructor(private http: HttpClient, private uiService: UiService,) {
        this.loadTasks();
    }

    private loadTasks(): void {
        const localTasks = this.getLocalTasks();

        if (localTasks.length) {
            this.tasksSubject.next(localTasks);
            this.currentLimit = localTasks.length; // Sincronizar límite con lo cargado
            return;
        }

        this.http.get<any[]>(this.apiUrl).
            pipe(
                map(tasks => tasks.slice(0, 10).map(task => ({
                    id: task.id,
                    title: task.title,
                    description: '',
                    completed: task.completed,
                    date: new Date().toISOString().split('T')[0]
                }))),
                catchError((error) => {
                    console.log('Error al traer la data de la api, mostrando datos locales...', error);
                    this.uiService.showToast('Error al traer la data de la api, mostrando datos locales...', 'danger');
                    return of([]);
                })
            ).subscribe(tasks => {
                this.tasksSubject.next(tasks);
                this.saveLocalTasks(tasks);
            });
    }

    loadMoreTasks(): Observable<void> {
        if (this.isFetching) return of(void 0);

        this.isFetching = true;
        this.currentLimit += 10;

        return this.http.get<any[]>(this.apiUrl).pipe(
            delay(1000),
            map(tasks => tasks.slice(this.currentLimit - 10, this.currentLimit).map(task => ({
                id: task.id,
                title: task.title,
                description: '',
                completed: task.completed,
                date: new Date().toISOString().split('T')[0]
            }))),
            tap(newTasks => {
                const currentTasks = this.tasksSubject.value;
                const combinedTasks = [...currentTasks, ...newTasks];
                const uniqueTasks = combinedTasks.filter((task, index, self) =>
                    index === self.findIndex((t) => t.id === task.id)
                );

                this.tasksSubject.next(uniqueTasks);
                this.saveLocalTasks(uniqueTasks);
                this.isFetching = false;
            }),
            map(() => void 0),
            catchError((err) => {
                console.error('Error al cargar más tareas', err);
                this.uiService.showToast('Error de conexión', 'danger');
                this.isFetching = false;
                return of(void 0);
            })
        );
    }

    getTasks(): Task[] {
        return this.tasksSubject.value;
    }

    getTaskById(id: number): Task | undefined {
        return this.tasksSubject.value.find(task => task.id === id);
    }

    createTask(task: CreateTaskDto): Task {
        const tasks = this.tasksSubject.value;
        const newTaskId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

        const newTask: Task = {
            id: newTaskId,
            title: task.title,
            description: task.description || '',
            completed: false,
            date: task.date || new Date().toISOString().split('T')[0]
        };

        const updatedTasks = [newTask, ...tasks];
        this.tasksSubject.next(updatedTasks);
        this.saveLocalTasks(updatedTasks);

        this.uiService.showToast('¡Tarea creada con éxito!');

        this.taskCreatedSource.next();

        return newTask;
    }

    changeTaskStatus(id: number): void {
        const tasks = this.tasksSubject.value;
        let finalStatus = false;
        const updatedTask = tasks.map(task => {
            if (task.id === id) {
                finalStatus = !task.completed;
                return { ...task, completed: finalStatus };
            }
            return task;
        });
        this.tasksSubject.next(updatedTask);
        this.saveLocalTasks(updatedTask);
        const msg = finalStatus ? 'Tarea cambiada a pendiente ⏳' : 'Tarea cambiada a completada ✅';
        const color = finalStatus ? 'primary' : 'success';
        this.uiService.showToast(msg, color);
    }

    deleteTask(id: number): void {
        const tasks = this.tasksSubject.value.filter(task => task.id !== id);
        this.tasksSubject.next(tasks);
        this.saveLocalTasks(tasks);
        this.uiService.showToast('Tarea eliminada con éxito', 'danger');
    }

    private saveLocalTasks(tasks: Task[]): void {
        localStorage.setItem(this.storageName, JSON.stringify(tasks));
    }

    private getLocalTasks(): Task[] {
        const storedTasks = localStorage.getItem(this.storageName);
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    clearAllTasks(): void {
        this.tasksSubject.next([]);
        localStorage.removeItem(this.storageName);
    }

}