import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController } from '@ionic/angular';


@Injectable()
export class LoaderProvider {
    constructor(public http: Http, public loadingCtrl: LoadingController) {

    }

    async show() {
        await this.loadingCtrl.create({
            message: 'Por favor espere...',
            spinner: 'crescent',
            duration: 3000
        }).then(load =>
            load.present()
        );
    }

    hide() {
        this.loadingCtrl.dismiss();
    }

}
