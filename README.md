# Todo Mobile App

Esta es una aplicación móvil híbrida desarrollada con **Ionic Angular** para gestionar tareas. Cumple con los requisitos del desafío técnico, incluyendo gestión de estado, persistencia local y consumo de API.

## 🚀 Cómo correr el proyecto

### Prerrequisitos
- Node.js (v18 o superior recomendado)
- Ionic CLI (`npm install -g @ionic/cli`)

### Pasos
1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/RoxZkiL/grupo-teknia.git
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Ejecutar en modo desarrollo**:
    ```bash
    ionic serve
    ```
    La aplicación se abrirá automáticamente en `http://localhost:8100`.
27. 
28. ## 📖 Guía de Uso
29. 
30. 1.  **Visualización**: Al abrir la app, verás la lista de tareas pendientes.
31. 2.  **Creación**: Haz clic en el botón de agregar (+) para crear una nueva tarea. Completa el título, descripción y selecciona una fecha.
32. 3.  **Detalles**: Toca cualquier tarea de la lista para ver su información completa.
33. 4.  **Persistencia**: Las tareas se guardan localmente para que no las pierdas al cerrar la aplicación.
34. 5.  **Modo Oscuro**: Puedes cambiar entre modo claro y oscuro usando el botón (toggle) ubicado en la parte superior derecha de la aplicación.

## 🧪 Pruebas Unitarias

El proyecto utiliza **Jasmine** y **Karma** para las pruebas unitarias. Se han configurado optimizaciones en `karma.conf.js` para evitar desconexiones en Windows.

### Ejecutar un test específico
Para probar la creación de tareas:
```bash
npx ng test --include src/app/pages/create-task/create-task.page.spec.ts --watch=false --browsers=ChromeHeadless
```

*Nota: Se recomienda usar `--watch=false` y `ChromeHeadless` para una ejecución rápida y limpia en terminal.*

## 📚 Librerías Utilizadas

-   **@ionic/angular**: Core del framework UI.
-   **@angular/common/http**: Para consumo de API.
-   **RxJS**: Manejo de flujos de datos asíncronos.
-   **Reactive Forms**: Validación robusta de formularios.
-   **Animate.css**: Para micro-interacciones y transiciones suaves.

## ✨ Mejoras Futuras (Funcionalidades)

-   **Categorización y Etiquetas**: Permitir agrupar tareas por categorías (Trabajo, Hogar, Estudio) para una mejor organización.
-   **Prioridades**: Implementar niveles de importancia (Baja, Media, Alta) con código de colores visual.
-   **Recordatorios y Notificaciones**: Notificaciones locales para alertar al usuario antes de que venza una tarea.
-   **Ordenamiento Dinámico**: Poder ordenar la lista por fecha de vencimiento, prioridad o alfabéticamente.
-   **Sub-tareas (Checklists)**: Capacidad de desglosar tareas complejas en pasos más pequeños dentro del detalle.
-   **Acciones en Lote**: Selección múltiple para borrar o marcar como completadas varias tareas de un solo click.
-   **Sincronización en la Nube**: Integración con un backend real (Firebase/Node.js) para acceder a las tareas desde cualquier dispositivo.

---
Desarrollado para el desafío técnico de **Grupo Teknia**.
