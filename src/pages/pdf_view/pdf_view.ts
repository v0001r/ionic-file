import { Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-pdf_view',
  templateUrl: 'pdf_view.html'
})
export class Pdf_viewPage {
  
  constructor( public navCtrl: NavController, public httpClient: HttpClient, public loadingController: LoadingController,public navParams: NavParams, private alertCtrl: AlertController) {


  }
  
  ngOnInit(){}
 


}
