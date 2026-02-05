import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonToggle, NavController, IonButtons, IonBackButton } from "@ionic/angular/standalone";
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonToggle, IonButtons, IonBackButton, FormsModule],
})
export class HeaderComponent {
  @Input() title: string = 'TaskManager';
  @Input() showBack: boolean = false;
  isDarkMode: boolean = false;

  constructor(private navCtrl: NavController, private themeService: ThemeService) { }

  ngOnInit() {}

  goBack() {
    this.navCtrl.back();
  }

    /**
   * Alterna el modo oscuro
   */
  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }

}
