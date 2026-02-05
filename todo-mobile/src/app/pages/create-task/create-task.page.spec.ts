import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CreateTaskPage } from './create-task.page';
import { TaskService } from 'src/app/services/task.service';
import { NavController } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateTaskPage', () => {
  let component: CreateTaskPage;
  let fixture: ComponentFixture<CreateTaskPage>;

  // Mocks simples
  const taskServiceMock = jasmine.createSpyObj('TaskService', ['createTask']);
  const navCtrlMock = jasmine.createSpyObj('NavController', ['navigateBack']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateTaskPage,         // Componente Standalone bajo prueba
        ReactiveFormsModule,    // Formularios
        BrowserAnimationsModule // Evitar errores de animaciones
      ],
      providers: [
        { provide: TaskService, useValue: taskServiceMock },
        { provide: NavController, useValue: navCtrlMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta ngOnInit()
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when title is empty', () => {
    // 1. Arrange: Obtener el control de título
    const titleControl = component.taskForm.controls['title'];

    // 2. Act: Dejarlo vacío
    titleControl.setValue('');

    // 3. Assert: El formulario debe ser inválido
    expect(component.taskForm.valid).toBeFalse();
    expect(titleControl.hasError('required')).toBeTrue();
  });

  it('should be valid when title has 3 or more characters', () => {
    // 1. Arrange
    const titleControl = component.taskForm.controls['title'];

    // 2. Act
    titleControl.setValue('Comprar pan');

    // 3. Assert
    expect(component.taskForm.valid).toBeTrue();
    expect(titleControl.valid).toBeTrue();
  });
});
