import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapPickerComponent } from "../component/map-picker/map-picker.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  coordinate:any = {
    lat : null,
    lng : null
  }

  constructor(public modalController: ModalController) { }

  async presentModal() {
    const modal = await this.modalController.create({
      component: MapPickerComponent,
      componentProps: this.coordinate
    });

    modal.onDidDismiss()
      .then((result) => {
        if (result.data != undefined) {
          console.log(result.data);

          this.coordinate = result.data
        }
      });

    return await modal.present();
  };

}
