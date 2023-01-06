
import { alertController } from '@ionic/vue';
export function alertService() {

    const createAlertInfo = async (title:string, message:string) => {
        const alert = await alertController.create({
            header: title,
            subHeader: message,
            buttons: ['OK'],
            cssClass: 'app-alert'
          });
          await alert.present();
    }
    return {
        createAlertInfo
    }
}