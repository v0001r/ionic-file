import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-my_profile',
  templateUrl: 'my_profile.html'
})
export class My_profilePage {
  agent: any;
  data: any = {};
  constructor( private ref: ChangeDetectorRef, public navCtrl: NavController, private alertCtrl: AlertController, public httpClient: HttpClient) {
  this.data.id = '';
 this.data.name = '';
 this.data.mobile = '';
 this.data.email = '';
 this.data.password = '';
 this.data.response = '';
 
 
  this.httpClient.get('https://cars110.in/qrcode/api/get_agent/' + localStorage.getItem("agent_id")).subscribe(
(success: any) => {
        if (success.status == 200) {
		this.agent = success.data;
		    console.log(success);        
this.ref.detectChanges();
        }
      }

);
 
  }
   ngOnInit(){}
profileupdate(){
		let postData = {
            "id": this.data.id,
            "username": this.data.name,
            "phone": this.data.mobile,
			"email": this.data.email,
			"password": this.data.password
    }

    this.httpClient.post("https://cars110.in/qrcode/api/agent_profile_update", JSON.stringify(postData))
      .subscribe(data => {
        console.log(data['message']);
		
		let alert = this.alertCtrl.create({
    title: 'Success',
    subTitle: data['message'],
    buttons: ['Dismiss']
	});
  alert.present();
		       }, error => {
        console.log(error);
		let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: 'Profile Not updated',
    buttons: ['Dismiss']
	});
  alert.present();
      });

	
  }
}
