import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'dark_mode';
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  public darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    this.loadTheme();
  }

  /**
   * Carga el tema guardado o usa modo claro por defecto
   */
  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    
    if (savedTheme !== null) {
      // Usar tema guardado
      const isDark = savedTheme === 'true';
      this.setDarkMode(isDark);
    } else {
      // Usar modo claro por defecto (en lugar de preferencia del sistema)
      this.setDarkMode(false);
    }
  }

  /**
   * Activa o desactiva el modo oscuro
   */
  setDarkMode(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem(this.THEME_KEY, String(isDark));
  }

  /**
   * Alterna entre modo claro y oscuro
   */
  toggleDarkMode(): void {
    const newValue = !this.darkModeSubject.value;
    this.setDarkMode(newValue);
  }

  /**
   * Obtiene el estado actual del modo oscuro
   */
  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}