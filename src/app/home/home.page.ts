import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;
  classificao: string;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    if (imc <= 18.5) {
      this.classificao = 'Magreza';
    } else if( imc > 18.5 && imc <= 24.9){
      this.classificao = 'Normal';
    } else if( imc > 24.9 && imc <= 29.9){
      this.classificao = 'Sobrepeso';
    } else if( imc > 29.9 && imc <= 39.9){
      this.classificao = 'Obesidade';
    } else if( imc >= 40.0){
      this.classificao = 'Obesidade Grave';
    }

    this.showMessage(`O seu IMC é ${imc.toFixed(2)}, isso te coloca no nível `+ this.classificao + ` da classificação.`);
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg,
        color: 'light',
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
