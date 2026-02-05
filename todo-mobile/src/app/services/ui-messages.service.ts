import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
    providedIn: 'root'
})
export class UiService {

    constructor(private toastCtrl: ToastController) { }

    async showToast(message: string, color: 'success' | 'danger' | 'primary' = 'success') {
        const toast = await this.toastCtrl.create({
            message,
            duration: 2000,
            color: color,
            position: 'bottom',
            mode: 'ios',
            buttons: [
                {
                    text: 'OK',
                    role: 'cancel'
                }
            ]
        });
        await toast.present();
    }
}