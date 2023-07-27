import { Component, OnInit} from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

import { Sign_upPage } from '../sign_up/sign_up';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-sign_in',
  templateUrl: 'sign_in.html'
})
//export class Sign_inPage {
	export class Sign_inPage implements OnInit{
data: any = {};

  constructor(private events: Events, public navCtrl: NavController, public httpClient: HttpClient, public alertController: AlertController) {
  this.data.pasword = '';
  this.data.mobile = '';
  this.data.response = '';
  }
   
  sign_up(){
        this.navCtrl.push(Sign_upPage)
  }    
  // home(){
        // this.navCtrl.setRoot(HomePage)
  // } 
  ngOnInit(){}
 login(){
        
		let postData = {
            "mobile": this.data.mobile,
			"password": this.data.pasword
    }

    this.httpClient.post("https://cars110.in/qrcode/api/cheak_login", JSON.stringify(postData))
      .subscribe(data => {
        console.log(data['id']);
		if(data['status'] == 200){
			  localStorage.setItem('agent_id', data['id']);
			  localStorage.setItem('agent_name', data['name']);
			     this.events.publish('agent:login', data['id']); 

		this.navCtrl.setRoot(HomePage)
		let alert = this.alertController.create({
											title: 'Success',
											subTitle: data['message'],
											buttons: ['Dismiss']
											});
										  alert.present();
		}else{
			let alert = this.alertController.create({
											title: 'Error',
											subTitle: data['message'],
											buttons: ['Dismiss']
											});
										  alert.present();
		}
		}, error => {
	   
        console.log(error);
      });

	
  } 

}
